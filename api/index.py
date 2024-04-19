from flask import Flask, request, jsonify, redirect, url_for, render_template
from flask_mail import Mail, Message
from flask_cors import CORS, cross_origin
from church import church
import metricas
import http.client
import json
import os
import requests
import pdf_gen
 
HUBSPOT_API_KEY = os.environ.get('HUBSPOT_API_KEY')
 
app = Flask(__name__)
mail = Mail(app)
CORS(app)
volume_search_last_month = 0
 
app.config['MAIL_SERVER'] = "smtp.gmail.com"
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = "jrivero.jesus@gmail.com"
app.config['MAIL_PASSWORD'] = "jrgr pagf uawe cohs"
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
app.config['WTF_CSRF_ENABLED'] = False
 
mail = Mail(app)
 
global current_church_obj
current_church_obj = church()
 
def post_contact_hubspot(church_obj):
 
    conn = http.client.HTTPSConnection("api.hubapi.com")
    payload = json.dumps({
    "properties": {
        "email": church_obj.email,
        "firstname": church_obj.first_name,
        "lastname": church_obj.last_name,
        "phone":church_obj.mobile_phone,
        "digital_assessment":"Yes",
        "company" : church_obj.name,
        "hs_marketable_status": "Marketing contact"
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
    payload = json.dumps({
    "properties": {
        "company": church_obj.name,
        "company_size" : church_obj.size,
        "phone" : church_obj.phone,
        "city" : church_obj.city,
        "country" : "United States",
       
    }
    })
    headers = {
    'User-Agent': 'Apidog/1.0.0 (https://apidog.com)',
    'Content-Type': 'application/json',
    'Authorization' : f'Bearer {HUBSPOT_API_KEY}'
    }
    conn.request("POST", f"/crm/v3/objects/companies?{HUBSPOT_API_KEY}", payload, headers)
    res = conn.getresponse()
    data = res.read()
    return (data.decode("utf-8"))


def send_email(church_obj):
 
    msg = Message(
            "Check your Digital Health Assessment report for your church: " + church_obj.name,
            sender ='jrivero.jesus@gmail.com',
            recipients = [church_obj.email]
            )
    pdf_gen.generate(church_obj.name)
    with app.open_resource("reports/" + (church_obj.name).replace(" ","_") + ".pdf") as pdf_file:
        msg.attach(church_obj.name + ".pdf", "application/pdf", pdf_file.read())
    msg.html = render_template("email.html", first_name = church_obj.first_name)
    mail.send(msg)
 
 
@app.route('/submit-form', methods=['POST'])
@cross_origin()
def handle_form_submission():
        global current_church_obj
        church_obj = church()
 
        form_data = request.get_json()
        church_obj.first_name = form_data.get("firstName")
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
        post_contact_hubspot(church_obj)
        #send_email(church_obj)
        current_church_obj = church_obj

        return jsonify({'message': 'Form submission received'}), 200  # Return 200 OK status code
 
 
 
 
 
@app.route('/api/fetch-data', methods=['GET'])
def fetch_data():
    global current_church_obj
    data = {
        'church_name': current_church_obj.name,
        'digitalVoice': current_church_obj.voice_score,
        'digitalMaps': current_church_obj.maps_score,
        'appleMaps': current_church_obj.apple_maps_score,
        'googleMaps': current_church_obj.google_maps_score,
        'socialClarity': 0,
        'websiteAuthority': current_church_obj.domain_trust_score,
        'vrVoice': 225,
        'vrMaps': 235,
        'vrSocial': 195,
        'vrWebsite':205,
        'last_month_searches': volume_search_last_month,
        'loc_address': current_church_obj.address,
        'loc_zipcode': current_church_obj.zipcode,
        'loc_city': current_church_obj.city,
        'loc_state': current_church_obj.state,
        'website' : current_church_obj.webpage
    }
    print(data)
    print("published data")
    return jsonify(data)
 
 
@app.route("/test")
def test():
    return jsonify({"message" : "test"})
 
if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port = 8080)