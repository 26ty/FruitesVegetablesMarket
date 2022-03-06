from flask import Flask, render_template, request, redirect, url_for
from flask import session
from database import db_session, init_db
from models.database import Member,Item
from sqlalchemy import desc
import os
app = Flask(__name__)

init_db()

# 設置金鑰
SECRET_KEY = os.urandom(32)
app.config['SECRET_KEY'] = SECRET_KEY

#index
@app.route('/')#函式的裝飾 到首頁
def index():
	return render_template('index.html')

@app.route('/logout')
def logout():
    session.pop("userName",None)
    session.pop("userId",None)
    session.pop("Password",None)
    return redirect(url_for("index"))
#-------------------------------------------------

@app.route('/all')
def all():
    item = Item.query.all() #顯示資料表的資料
    return render_template('all.html',item=item)

@app.route('/creatProduct',methods=['GET','POST'])
def creatProduct():
    error=""
    if request.method == 'POST':
        item = Item(
            productName=request.args.get("productName",""),
            introduction=request.args.get("introduction",""),
            productPrice=request.args.get("productPrice",""),
            productImg=request.args.get("productImg","")
        )
        db_session.add(item)#SQLite新增
        db_session.commit()#存入
        return error
    return render_template('creatProduct.html')

@app.route('/item_car')
def item_car():
    return render_template('item_car.html')

@app.route('/item',methods=['GET']) #get產品網址 回傳資料庫 撈資料 跟login很像
def item():
    itemid = request.args.get("id",""), #get id
    item=Item.query.filter(Item.id == request.args.get("id","")).first()
    return render_template('item.html', item=item)

@app.route('/setting')
def setting():
    return render_template('setting.html')

@app.route('/register',methods=['GET','POST'])
def register():
    error = ""
    #sid = request.args.get("id")
    if request.method == 'POST':
        person = Member(
            userName=request.args.get("userName",""),
            Password=request.args.get("Password",""),
            userId=request.args.get("userId",""),
            permission=request.args.get("permission","")
        )
        db_session.add(person)#SQLite新增
        db_session.commit()#存入
        return error
    return render_template('register.html')
#----------------------------------------------------------------------------------------------------------
@app.route('/login',methods=['GET','POST'])
def login():
    error = ""
    if request.method == 'POST':
        person=Member.query.filter(Member.userId == request.args.get("userId","")).first()
        # 確認資料庫有無帳號
        if person:
            if person.Password == request.args.get("Password",""):#若存在帳號 核對密碼
                session['userId'] = person.userId#存成session
                session['Password'] = person.Password
                session['userName'] = person.userName
                return error
            else:#若密碼驗證錯誤 顯示錯誤
                person = None #取消尋找此帳號
                error = "帳號或密碼錯誤"
                return error
        if not person:
            error = "帳號或密碼錯誤"
            return error
    return render_template('login.html',error=error)



# Run App
if __name__ == "__main__":
    app.jinja_env.auto_reload = True
    app.run(
        host='0.0.0.0',
        port=5000,
        debug=True
    )
