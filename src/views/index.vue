<template>
  <div class="index">
    <el-container>
      <el-header>
       <span class="title"> 双 体 系 开 发 中 心 签 到 管 理 系 统</span>
        <el-dropdown>
          <span class="el-dropdown-link">
            <span class="nowS">当前系统：{{nowSystem}}</span> 
            <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
         <el-dropdown-menu slot="dropdown">
            <el-dropdown-item divided @click.native="sm">扫码签到</el-dropdown-item>
            <el-dropdown-item divided @click.native="face">人脸签到</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-menu
            :default-active = "path"
            
            class="el-menu-vertical-demo"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#edd42a"
           
          >
            <el-menu-item index="/HelloWorld" @click="changeA('/HelloWorld')" v-show="isShow">
              <i class="el-icon-menu"></i>
              <span slot="title">扫码签到</span>
            </el-menu-item>
            <el-menu-item index="/watchtime" @click="changeA('/watchtime')">
              <i class="el-icon-date"></i>
              <span slot="title">查看时长</span>
            </el-menu-item>
            <el-menu-item index = "/usermanage"  @click="changeN">
         
      
              <i class="el-icon-setting"></i>
              <span slot="title" >用户管理</span>
        
            </el-menu-item>
            
          </el-menu>
        </el-aside>
          <el-dialog
                title="请输入密码："
                :visible.sync="dialogVisible"
                width="30%"
                height="100px"
                
                >
                  <el-input
                    placeholder="请输入管理密码"
                    v-model="input"
                    show-password
                    clearable>

                  </el-input>

                <span slot="footer" class="dialog-footer">
                  <el-button @click="deleteT">取 消</el-button>
                  <el-button type="primary" @click = "submitpassword">确 定</el-button>
                </span>
              </el-dialog>
        <el-main>
        
          <router-view />
        </el-main>
      </el-container>
      <el-footer>
        <span class="bottomS">使用过程中有任何问题请联系@王璐(lg1065849@qq.com)/@李晖(1379965820@qq.com)</span>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      nowSystem: localStorage.getItem("a") !== "人脸" ? "扫码签到" : "人脸签到",
      isShow: localStorage.getItem("a") !== "人脸",
      dialogVisible: false,
      path:'/HelloWorld',
      input:""
    };
  },
  methods: {
    sm() {
      this.nowSystem = "扫码签到";
      this.isShow = true;
      localStorage.setItem("a", "扫码");
      localStorage.setItem("type", "2");//type值
      this.$router.push({path:'/HelloWorld'})
      window.location.reload();
    },
    face() {
      this.nowSystem = "人脸签到";
      this.isShow = false;
      localStorage.setItem("a", "人脸");
      localStorage.setItem("type", "1");
      this.$router.push({path:'/watchtime'})
      window.location.reload();
    },
    setA() {
      if (!localStorage.getItem("a")) {
        localStorage.setItem("a", "扫码");
        localStorage.setItem("type", "2");
      }
    },
    submitpassword(){ 
      if(this.input === "20201016"){
        this.dialogVisible = false
              sessionStorage.setItem('admin','admin')
              this.$router.push({path:'/usermanage'})
          }else{
            this.$message({
              message: '密码错误，请重新输入',
              type: 'error'
            }); 
           this.input = ""
          }
    },

    changeN(){
       
       
       
        if(!sessionStorage.getItem('admin')){
            this.dialogVisible = true
        }else{
          this.dialogVisible = false
          this.$router.push({path:"/usermanage"})
          this.path = "/usermanage" 
        }

    },
    
    changeA(indexX){
      if(this.$route.path !==indexX)
      this.$router.push({path:indexX})
    },
    deleteT(){
      this.dialogVisible = false
      if(this.$route.path ==='/home'){
        this.path =""
      }else{
        this.path = this.$route.path
      }
      
    },
    // handleClose(done) {
    //     this.$confirm('确认关闭？')
    //       .then(_ => {
    //         done();
    //       })
    //       .catch(_ => {});
    // }
    
   
  },
  created() {
    this.setA();
    this.path =this.$route.path
  }
};
</script>
<style scoped>
.bottomS{
  /* position: relative;
  left: 30%; */
}
.nowS{
  font-size: 15px;
}
.title{
   position: relative;
  left: 7%;
  font-weight: bold;
  font-size: 22px;
}
.el-dropdown {
  float: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: white;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.el-container {
  height: 100%;
}
.index {
  height: 100%;
}
.tac {
  width: 100% !important;
}
.el-header,
.el-footer {
  background-color: #353c3f;
  color: white;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #313743;
  color: #e9eef3;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  height: 100%;
  display: block;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  overflow: auto;
  padding: 20px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>