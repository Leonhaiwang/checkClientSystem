<template>
  <div class="home"
  >
  <div class="title">
    <span class="T1">欢迎使用双体系开发中心签到管理系统</span><br>
  </div>
  <div class="att"><p style="color:#FF970F;margin-left:20px;margin-bottom:10px;">注意事项:</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;">上传用户信息时,uid为用户的唯一标识,请勿重复！</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;">右上角可查看当前系统状态,不要随意删除用户信息</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;">批量上传用户信息时,需严格按照上传,否则将有不可描述的错误产生!</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;">请勿将后台管理登录密码泄露给其他人,如使用用户管理功能需输入二级密码才可正确使用!</p>
    </div>
  <div class="face_sign">
    <p style="color:#FF970F;margin-left:20px;margin-bottom:10px;">相关文件下载地址:</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;"><span class="face">人脸签到</span>APK下载地址：链接：https://pan.baidu.com/s/1z1RA1Iaw5sI3YD_DCWLXbw 提取码：hgau </p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;"><span class="face">人脸签到</span>APP源码地址：https://github.com/WaNgLu001/face_sign_client</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;"><span class="qr">扫码签到</span>APK下载地址：链接：https://pan.baidu.com/s/1LTBbjDvv8LUknguTPmfQ2w 提取码：mbdq </p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;"><span class="qr">扫码签到</span>APP源码地址：https://github.com/WaNgLu001/qrcode_client</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;"><span class="ht">签到后台管理</span>系统源码地址：https://github.com/WaNgLu001/sign_client_serve</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;"><span class="ht">服务器后台</span>源码地址：https://github.com/WaNgLu001/face_sign_serve</p>
    <p style="color:#519ae6;margin-left:30px;margin-bottom:10px;"><span  class="rl">人脸库</span>修改地址在用户管理/添加用户界面获取</p>
  </div>
    <div>

    <h3 class="bottom">本项目最终解释权归@双体系开发中心软件部所有</h3>
    </div>
  </div>
</template>
<style scoped>
.bottom{
  color: #bbb;
  font-size: 15px;
}
.rl{
  color: rgb(159, 103, 185);
}
.face{
  color: #f06cf5;
}
.qr{
  color: #9dac4c;
}
.ht{
  color: #1de268;

}
 p{
   font-size: 15px;
 }
  .home{    
    height: 100%;
    background-color: #e0f8f7;

  }
  .title{
  padding-top:20px;
  }
  .face_sign{
    height: 300px;
    text-align: left;
    margin-left: 40px;
    /* background-color: #fff; */
  }
  .att{
    text-align: left;
    /* height: 80px; */
    margin-top: 15px;
    padding: 0 40px;
    margin-bottom: 40px;
  }
  .face_sign .title1 {
    font-size: 20px;
    color: #52be1c;
    margin-bottom: 10px;
  }
  .qr_sign .title1 {
    font-size: 20px;
    color: #52be1c;
    margin-bottom: 10px;
  }
.T1{
  /* position: relative;
   top: 20px; */
  font-size: 30px;
  color: rgb(0, 138, 201);
  font-weight: bolder;
}
</style>