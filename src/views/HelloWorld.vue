<template>
  <div class="H">
    <div class="hello">
      <div class="qrcode" ref="qrCodeUrl"></div>
    </div>
    <div>
      <h1 class="fontQ">扫码签到</h1>
    </div>
    <div>
      <el-row>
        <el-button type="danger" @click="start" round plain>{{T}}</el-button>
        <el-button @click="drawer = true" type="primary" round plain style="margin-left: 16px;">手动签到</el-button>

        <el-drawer :visible.sync="drawer" :direction="direction">
          <span class="shoudongtext">手动签到</span>

          <el-input
            class="inputnum"
            placeholder="请输入学号"
            v-model="uid"
            maxlength="10"
            show-word-limit
          ></el-input>

          <el-button class="plainbutton" type="primary" plain round @click="QRSign">签到</el-button>
          <br>
          <el-button class="plainbutton" type="danger" plain round @click="QRSignOut">签退</el-button>
        </el-drawer>
      </el-row>
    </div>
  </div>
</template>

<script>
import QRCode from "qrcodejs2";
export default {
  data() {
    return {
      name: "HelloWorld",
      props: {
        msg: String
      },
      drawer: false,
      direction: "rtl",
      uid: "",
      qrcode: "",
      timer: null,
      T:'开始签到'
    };
  },
  methods: {
    creatQrCode() {
      return new QRCode(this.$refs.qrCodeUrl, {
        text: "http://192.168.123.210:8080/#/HelloWorld", // 需要转换为二维码的内容
        width: 360,
        height: 360,
        correctLevel: QRCode.CorrectLevel.L
      });
    },
    start() {
      if(this.T === '开始签到'){
        this.T = "暂停签到"
      }else{
        this.T = '开始签到'
      }
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      } else {
        this.timer = setInterval(() => {
          this.qrcode.clear();
          let obj = {name:'rjb',timer:Date.now()}
          this.qrcode.makeCode(JSON.stringify(obj));
        }, 3000);
      }
    },
     async QRSign() {
        if(this.uid != ''){
          const  {data}  = await this.$http.get(`/QRSign?uid=${this.uid}`);
          if(data.status === 0){
            this.$message({
            message: '签到成功',
            type: 'success'
            }); 
          }else if(data.status === 1){
            this.$message({
            message: '请勿重复签到',
            type: 'error'
            }); 
          }else if(data.status === 3){
            this.$message({
            message: '学号不存在，请注册后再签到',
            type: 'error'
            }); 
          }
          this.uid = ""
        }
    },

    async QRSignOut() {
      
        const  {data}  = await this.$http.get(`/QRSignOut?uid=${this.uid}`);
        var datamsg = data.msg

        if(data.status === 0){

            this.$message({
            message: `${data.msg}小时`,
            type: 'success'
            }); 
          }else if(data.status === 3){
            this.$message({
            message: '学号不存在',
            type: 'error'
            }); 
          }else if(data.status === 4){
            this.$message({
            message: '请先签到',
            type: 'error'
            }); 
          }
       this.uid = ""
     
    }
  },
  mounted() {
    this.qrcode = this.creatQrCode();
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.shoudongtext {
  color: rgb(0, 138, 201);
  font-size: 30px;
  font-weight: bold;
}
.plainbutton {
  margin-top: 30px;
  width: 140px;
}
.inputnum {
  margin-top: 40px;
  width: 90%;
}
.el-row {
  margin-top: 40px;
}
.H {
  height: 100%;
  background-color: #e0f8f7;
}
.hello {
  display: flex;
  justify-content: center;
  align-items: center;
}
.qrcode {
  margin-top: 50px;
}
.fontQ {
  margin-top: 30px;
  font-size: 60px;
  color: rgb(0, 138, 201);
  font-weight: bolder;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
