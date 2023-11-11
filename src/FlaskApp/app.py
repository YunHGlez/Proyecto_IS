from flask import Flask, render_template, url_for, redirect
from flask_cors import CORS, cross_origin
from alchemyClasses import db
from controllers.UsuarioController import user

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://root:password123@localhost:3306/practica5"
app.config.from_mapping(
    SECRET_KEY='dev'
)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

app.register_blueprint(user)
db.init_app(app)

if __name__ == '__main__':
    app.run()
