from flask import Flask, request, jsonify
from flask_mail import Mail, Message
from flask_cors import CORS
from church import church
import metricas

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

@app.route('/submit-form', methods=['GET', 'POST'])
def handle_form_submission():

        print("entered func")
        # Access form data
        form_data = request.form
        print(f"Received form data: {form_data}")

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
        #volume_search_last_month = metricas.start_historical(church_obj.city, church_obj.state)
        
        print("**********")
        church_obj.get_digital_search_assesment_score()
        print(church_obj.digital_search_assesment_score)
        church_obj.get_map_image()
        print(church_obj.digital_search_assesment_score)

        
        print(volume_search_last_month)
        print('Form submission received')

        return jsonify({'message': 'Form submission received'})

data = {
    'church_name': 'Grace Church',
    'digitalVoice': 80,
    'digitalMaps': 70,
    'socialClarity': 60,
    'websiteAuthority': 75,
    'vrVoice': 90,
    'vrMaps': 85,
    'vrSocial': 75,
    'vrWebsite': 80,
    'last_month_searches': 1200,
    'loc_city': 'New York',
    'loc_state': 'NY'
}

@app.route('/api/fetch-data', methods=['GET'])
def fetch_data():
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True, port=5000)