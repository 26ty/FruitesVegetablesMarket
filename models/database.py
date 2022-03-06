from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from database import Base
from sqlalchemy.orm import relationship
import datetime
import uuid

#模型(model)定義
class Member(Base):
    __tablename__ = 'person'
    userId = Column(String(50), nullable=False, primary_key=True)
    userName = Column(String(50), nullable=False)
    Password = Column(String(50), nullable=False)
    permission = Column(String(50), nullable=False)

    def __init__(self, userName, Password, userId, permission):
        self.userId = userId
        self.Password = Password
        self.userName = userName
        self.permission = permission

    def __repr__(self):
        return self.userName + '/' + self.userId + "/" + self.Password + '/' + self.permission


class Item(Base):
    __tablename__= 'item'
    id = Column(String(50),primary_key=True)
    productName = Column(String(50))
    introduction = Column(String(50))
    productPrice = Column(String(50))
    productImg = Column(String(50))

    def __init__(self,productName,productPrice,introduction,productImg):
        self.id=str(uuid.uuid4())
        self.productName=productName
        self.productPrice=productPrice
        self.introduction=introduction
        self.productImg=productImg

def __repr__(self):#傳遞物件
    return self.productName + '/' + self.introduction + "/" + self.productPrice + '/' + self.productImg
