from flask import Flask, request, jsonify, redirect, url_for
from flask_mail import Mail, Message
from flask_cors import CORS
from church import church
import metricas
import http.client
import json
import os

HUBSPOT_API_KEY = os.environ.get('HUBSPOT_API_KEY')

app = Flask(__name__)
mail = Mail(app)
CORS(app)
church_obj = church()
volume_search_last_month = 0

app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "jrivero.jesus@gmail.com"
app.config['MAIL_PASSWORD'] = "jrgr pagf uawe cohs"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

def post_contact_hubspot():

    conn = http.client.HTTPSConnection("api.hubapi.com")
    payload = json.dumps({
    "properties": {
        "email": church_obj.email,
        "firstname": church_obj.first_name,
        "lastname": church_obj.last_name,
        "phone":church_obj.mobile_phone,
        "digital_assessment":"Yes"
    }
    })
    headers = {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json',
    'Authorization' : f'Bearer {HUBSPOT_API_KEY}'
    }
    conn.request("POST", f"/crm/v3/objects/contacts?{HUBSPOT_API_KEY}", payload, headers)
    res = conn.getresponse()
    data = res.read()
    
    conn = http.client.HTTPSConnection("api.hubapi.com")
    headers = {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json',
    'Authorization' : f'Bearer {HUBSPOT_API_KEY}'
    }
    conn.request("POST", f"/crm/v3/objects/contacts?{HUBSPOT_API_KEY}", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return (data.decode("utf-8"))

def send_email():
    msg = Message( 
            "Check your Digital Health Assessment report for your church: " + church_obj.name, 
            sender ='jrivero.jesus@gmail.com', 
            recipients = [church_obj.email] 
            ) 
    msg.body = church_obj.first_name + " " + church_obj.last_name + ' here is your Digital Health Assessment report attached as a PDF.'
    mail.send(msg)

@app.route('/submit-form', methods=['GET', 'POST'])
def handle_form_submission():
    try:
        print("entered func")
        # Access form data
        form_data = request.form
        print(f"Received form data: {form_data}")
        global church_obj
        church_obj.first_name = form_data.get("firstName") 
        print("-------------------")
        church_obj.last_name = form_data.get("lastName") 
        church_obj.mobile_phone = form_data.get("mobilePhone")
        church_obj.email = form_data.get("email")
        church_obj.name = form_data.get("churchName")
        church_obj.size = form_data.get("churchSize")
        church_obj.address = form_data.get("churchAddress")
        church_obj.city = form_data.get("churchCity")
        church_obj.state = form_data.get("churchState")
        church_obj.zipcode = form_data.get("churchZipCode")
        church_obj.webpage = form_data.get("churchWebsite")
        church_obj.phone = form_data.get("churchPhone")
        church_obj.facebook_profile = form_data.get("churchFacebook")
        church_obj.instagram_profile = form_data.get("churchInstagram")

        global volume_search_last_month
        try:
            volume_search_last_month = metricas.start_historical(church_obj.city, church_obj.state)
        except:
            pass

        church_obj.get_digital_search_assesment_score()
        church_obj.get_map_image()
        post_contact_hubspot()
        send_email()

        return jsonify({'message': 'Form submission received'}), 200  # Return 200 OK status code

    except Exception as e:
        print('Failed to parse form data', e)
        return jsonify({'error': 'Failed to parse form data'}), 400 



@app.route('/api/fetch-data', methods=['GET'])
def fetch_data():
    data = {
        'church_name': church_obj.name,
        'digitalVoice': church_obj.voice_score,
        'digitalMaps': church_obj.maps_score,
        'appleMaps': church_obj.apple_maps_score,
        'googleMaps': church_obj.google_maps_score,
        'socialClarity': 0,
        'websiteAuthority': church_obj.domain_trust_score,
        'vrVoice': 225,
        'vrMaps': 235,
        'vrSocial': 195,
        'vrWebsite':205,
        'last_month_searches': volume_search_last_month,
        'loc_address': church_obj.address,
        'loc_zipcode': church_obj.zipcode,
        'loc_city': church_obj.city,
        'loc_state': church_obj.state,
        'website' : church_obj.webpage
    }
    print(data)
    print("published data")
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0", port=8080)