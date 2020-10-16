<template>
  <div class="usermanage">
    <div class="inner">
      <div class="inputbutton">
        <div>
          <el-button type="primary" plain @click="toggleSelection()">取消选择</el-button>
          <el-button type="danger" plain @click="handleDeleteMax()">批量删除</el-button>
          <el-button @click="drawer = true" type="success" plain>添加用户</el-button>
          <el-button @click="addExcel = true" type="warning" plain>批量添加</el-button>
          <el-button @click="changeweek = true" type="info" plain>修改当前周</el-button>
        </div>
          <div class="search">
          <el-input
            clearable
            placeholder="输入关键字搜索"
            prefix-icon="el-icon-search"
            v-model="searchText"
            @input = "inputChange"
            >
        </el-input>
        </div>
        
        
        <el-drawer :visible.sync="drawer" :direction="direction">
          <span class="shoudongtext">添加用户</span>
          <el-input class="inputnum" placeholder="姓名" v-model="name" show-word-limit></el-input>
          <el-input class="inputnum" placeholder="班级" v-model="classname" show-word-limit></el-input>
          <el-input
            class="inputnum"
            placeholder="请输入学号"
            v-model="uid"
            maxlength="10"
            show-word-limit
          ></el-input>

          <el-button class="plainbutton" type="primary" plain round @click="addOnePerson">提交</el-button>
          <div class="ppp">
          <p v-show="isShow">导入必看 : 只能上传xlsx,xls文件,且表头为 name(姓名) uid(学号) class(班级) 且顺序不可改变</p>
             <p v-show="isHow">导入必看 : 只能上传xlsx,xls文件,且表头为 name(姓名) uid(用户唯一标识-与人脸库中的唯一标识一致) class(班级) 且顺序不可改变</p>
             <br> 
              <p v-show="isHow">批量上传人脸文件命名为 ： face_sign_user</p> 
              <br>
              <p v-show="isShow">批量上传扫码文件命名为 ： qrcode_sign_user</p>
              <p v-show="isHow"></p><br><br>
            <p v-show="isHow">人脸库数据说明:登录在人脸库名称face_sign中的RJB_face进行操作</p><br>
            <p v-show="isHow">登录地址：<a style="text-decoration: underline;" target="_blank" href="https://console.bce.baidu.com/ai/?_=1602837503750&fromai=1#/ai/face/facelib/appList">百度AI人脸库系统</a></p><br>
            <p v-show="isHow">账号：15235133253 密码：14221..</p>
         </div>
        </el-drawer>
        <el-drawer :visible.sync="addExcel" :direction="direction">
          <span class="shoudongtext">批量添加用户</span>
          <el-upload
            action="http://192.168.123.210:9966/profile"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            :on-success="success"
            accept=".xls,.xlsx"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            ref = "upload"
          >
            <div slot="tip" class="el-upload__tip ppp">
             <p v-show="isShow">导入必看 : 只能上传xlsx,xls文件,且表头为 name(姓名) uid(学号) class(班级) 且顺序不可改变</p>
             <p v-show="isHow">导入必看 : 只能上传xlsx,xls文件,且表头为 name(姓名) uid(用户唯一标识-与人脸库中的唯一标识一致) class(班级) 且顺序不可改变</p>
             <br> 
              <p v-show="isHow">批量上传人脸文件命名为 ： face_sign_user</p> 
              <br>
              <p v-show="isShow">批量上传扫码文件命名为 ： qrcode_sign_user</p>
            <p v-show="isHow"></p><br><br>
            <p v-show="isHow">人脸库数据说明:登录在人脸库名称face_sign中的RJB_face进行操作</p><br>
            <p v-show="isHow">登录地址：<a style="text-decoration: underline;" target="_blank" href="https://console.bce.baidu.com/ai/?_=1602837503750&fromai=1#/ai/face/facelib/appList">百度AI人脸库系统</a></p><br>
            <p v-show="isHow">账号：15235133253 密码：14221..</p>

            </div>
            <el-button class="addbutton" type="primary" plain round>点击上传</el-button>
          
          </el-upload>
          </el-drawer>
        <el-drawer :visible.sync="changeweek" :direction="direction">
          
          <span class="shoudongtext">修改当前周</span>
          <div><span class="nowWeek">当前第 {{nowWeek}} 周</span></div>
          <el-input class="inputnum" placeholder="当前周" v-model="newWeek" show-word-limit></el-input>
          <el-button class="plainbutton" type="primary" plain round @click="changeweekS">提交</el-button>
        </el-drawer>
      </div>
    </div>

    <!-- 表 -->
    <div class="innerbox">
      <el-table
        ref="multipleTable"
        tooltip-effect="dark"
        :data="tableData"
        stripe
        height="480"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :row-style="rowStyle"
        :row-class-name="rowClassName"
        @row-click="rowclick"
      >
        <el-table-column type="selection"  width="55"></el-table-column>
        <el-table-column prop="name" label="姓名" ></el-table-column>
        <el-table-column prop="uid" label="学号" ></el-table-column>
         
        <el-table-column prop="class" :label="a==='人脸'?'所在教室':'班级'" ></el-table-column>
        <el-table-column prop="mac" v-if = "isShow" label="MAC地址" ></el-table-column>
        <el-table-column  label="操作" width='260'>
          <template slot-scope="scope">
            <el-button
            v-if="isShow"    
              size="mini"
              type="success"
              @click="handlechange(scope.row)"
            >更换设备</el-button>
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row.uid)"
            >删除用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="block">
    <!-- 分页 -->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[9, 13,20]"
      :page-size="number"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>
  </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      newtableData:[],
      tableData: [],
      searchValueData:[],//保存搜索到的值
      uid:'',
      drawer: false,
      addExcel: false,
      changeweek:false,
      direction: "rtl",
      stunum: "",
      name: "",
      classname: "",
      nowWeek:"",
      newWeek:"",
      a: "班级",
      type:'',
      fileList: [],//上传文件的文件夹
      multipleSelection: [],//选中的删除用户的uid
      isShow: localStorage.getItem("a") !== "人脸",
      isHow:localStorage.getItem("a") == "人脸",
      newval:[],
      currentPage:1,//当前页
      total:0,//总条数
      number:9,//每页number条
      macAddress:'',//唯一地址,
      searchText:'',
      daochuExcel:[]
    };
  },
  created() {
    this.getA();
    this.getAllUser()
    this.getWeek()
  },
  methods: {
    searchValue(str){
      this.searchValueData = []
      this.newtableData.forEach((el)=>{
        if(el.uid.indexOf(str)!==-1 || el.class.indexOf(str)!==-1 || el.name.indexOf(str)!==-1){
          this.searchValueData.push(el)
        }  
      })
      this.total = this.searchValueData.length
      this.tableData = this.searchValueData.slice((this.currentPage - 1)*this.number,this.currentPage*this.number)
  // console.log(this.searchValueData)
    },
    //输入框值改变触发函数
    inputChange(str){
      //定时器，防抖
      if(this.timer!==''){
        clearTimeout(this.timer)
        this.timer=''
      }
       this.timer = setTimeout(()=>{
         this.searchValue(str)
         this.timer = ''
       },500)  
    }
    ,
    rowclick(row, column, event){
      this.$refs.multipleTable.toggleRowSelection(row);
      this.multipleSelection.push(row)
    },
       //更换设备
    async handlechange(index){
      const { data } = await this.$http.get(`/removeMac?uid=${index.uid}`);
      if(data.status === 0){
        this.$message({
          message:data.msg,
          type: 'success'
        });
        index.mac = '1'
      }else if(data.status === 1){
        this.$message({
          message:data.msg,
          type: 'error'
        });
      }
    
      this.getAllUser()
    },
    //获取删除用户多选uid[]
    handleDeleteMax() {
      this.multipleSelection.forEach((val)=>{
        this.newval.push(val.uid)
      })
      var newStr = ""
      this.newval.forEach((val)=>{
        newStr+=`'${val}',`
      })
      newStr = newStr.substring(0,(newStr.length-1))
      this.deleteUsers(newStr)

    },
    //批量删除用户
    async deleteUsers(index){ 
      if(this.multipleSelection != ""){
        if(this.type === "1"){//人脸
          const {data} = await this.$http.get(`/deleteUser?type=${this.type}&uids=${index}`)
          if(data.status === 0){
                this.$message({
              message: '删除成功',
              type: 'success'
            }); 
            this.getAllUser()
          }            
       }else if(this.type === "2"){
         const {data} = await this.$http.get(`/deleteUser?type=${this.type}&uids=${index}`)
          if(data.status === 0){
                this.$message({
              message: '删除成功',
              type: 'success'
            }); 
            this.getAllUser()
          } 
       }
      }
    //清空数组
      this.multipleSelection = []
      this.newval = []
      index = ""  

    },
    //添加单个用户
    async addOnePerson(){
      const {uid,name,classname} = this
      if(uid&&name&&classname){ 
        const { data } = await this.$http.post("/addOneUser",{uid:this.uid,name:this.name,classname:this.classname,type:this.type })
        if(data.status === 0){
          this.$message({
          message: '上传用户信息成功',
          type: 'success'
        });
        
        setTimeout(()=>{
          this.getAllUser()
        },500)
        this.uid = ""
        this.name = ""
        this.classname = ""

        }
      }else{
          this.$message({
          message: '请正确输入内容',
          type: 'error'
        });
      }
                     
            
    },
    //上传成功
    success(file){
      if(file.status==1){
        this.$refs.upload.clearFiles()
        this.$message({
          message: '上传失败，请检查文件格式',
          type: 'error'
        });
      }else if(file.status==0){
        this.$message({
          message: '批量导入成功',
          type: 'success'
        });
         this.$refs.upload.clearFiles()
        this.getAllUser()
        this.addExcel = false
        this.getAllUser()
      }
    },
    //查询所有的用户
    async getAllUser() { 
      if(this.type === "1"){//人脸
          const { data } = await this.$http.get(`/getAllUser?type=${this.type}`);
          this.newtableData = data.data;
          this.total = data.data.length
       }else if(this.type === "2"){
          const { data } = await this.$http.get(`/getAllUser?type=${this.type}`);          
          this.newtableData = data.data;
          this.total = data.data.length
       }
       this.getTableData()
    },
    //删除用户
    async deleteUser(index){ 
      if(this.type === "1"){//人脸
          const {data} = await this.$http.get(`/deleteUser?type=${this.type}&uids=${index}`)
          if(data.status === 0){
                this.$message({
              message: '删除成功',
              type: 'success'
            }); 
            this.getAllUser()
          }            
       }else if(this.type === "2"){
         const {data} = await this.$http.get(`/deleteUser?type=${this.type}&uids=${index}`)
          if(data.status === 0){
                this.$message({
              message: '删除成功',
              type: 'success'
            }); 
            this.getAllUser()
          } 
       }

    },
    //获取当前周
    async getWeek() { 
        if(this.type === "1"){//人脸 
          const { data } = await this.$http.get(`/getWeek?type=${this.type}`);
          this.nowWeek = data.week
       }else if(this.type === "2"){//扫码
          const { data } = await this.$http.get(`/getWeek?type=${this.type}`);
          this.nowWeek = data.week
        }  
        this.getTableData()
    },
    
    handleSizeChange(val) {

        this.number = val
         if(this.searchText === ""){
        
         this.getTableData()
       }else{
         this.searchValue(this.searchText)
       }

      },
      //获取当前页面值
    handleCurrentChange(val) {
      this.currentPage = val
       if(this.searchText === ""){
         this.getTableData()
       }else{
         this.searchValue(this.searchText)
       }
       
        
    },
    getTableData(){
        this.tableData = this.newtableData.slice((this.currentPage - 1)*this.number,this.currentPage*this.number)
    },
    //修改当前周
    async setWeek() { 
        if(this.type === "1"){//人脸
         if(this.newWeek === ""){
           this.$message({
          message: '不能为空',
          type: 'error'
        }); 
          return 
        }
        const  {data}  = await this.$http.get(`/setWeek?type=${this.type}&week=${this.newWeek}`);
        if(data.status==0){
          this.$message({
          message: '修改成功',
          type: 'success'
        }); 
        this.getWeek()
        this.newWeek = ""
        }
       }else if(this.type === "2"){//扫码
         if(this.newWeek === ""){
           this.$message({
          message: '不能为空',
          type: 'error'
        }); 
          return 
        }
        const  {data}  = await this.$http.get(`/setWeek?type=${this.type}&week=${this.newWeek}`);
        if(data.status==0){
          this.$message({
          message: '修改成功',
          type: 'success'
        }); 
        this.getWeek()
        this.newWeek = ""
        }
        } 
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    rowStyle({ row, rowIndex }) {
      Object.defineProperty(row, "rowIndex", {
        //给每一行添加不可枚举属性rowIndex来标识当前行
        value: rowIndex,
        writable: true,
        enumerable: false
      });
    },
   
    //选中高亮
    rowClassName({ row, rowIndex }) {
      let rowName = "",
        findRow = this.multipleSelection.find(c => c.rowIndex === row.rowIndex);
      if (findRow) {
        rowName = "current-row ";
      }
      return rowName; //也可以再加上其他类名 如果有需求的话
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleEdit(index, row) {
    
    },
    //删除
    handleDelete(index) {
      index = `'${index}'`
      this.deleteUser(index)
    },
    handleRemove(file, fileList) {
    
    },
    handlePreview(file) {
    
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 1 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    submit() {
      (this.name = ""), (this.classname = ""), (this.stunum = "");
      alert("已添加");
    },
    changeweekS(){
      this.setWeek()
    },
    getA() {
      var token = localStorage.getItem("a");
      this.a = token
      var T = localStorage.getItem('type')
      this.type = T
    }
  }
};
</script>
<style scoped>
.ppp > p{
  margin: 20px 20px -30px 20px;
  color:#ff970F;
  font-size: 14px;
  line-height: 24px;text-align: center;
  
}
.block{
  margin-top: 15px;
}
 .nowWeek{
   position: relative;
  top: 20px;
   color: gray;
  font-size: 16px;
  
}
.el-table--striped .el-table__body tr.el-table__row--striped.current-row td{
   background:  #a7c2e0 !important;
}
.inputbutton {
  /* position: fixed;
  z-index: 9999; */
  top: 85px;
}
.innerbox {
  /* position: absolute; */
  /* overflow: hidden; */
  width: 100%;
  top: 50px;
}

.addbutton {
  margin-top: 40px;
  margin-bottom: 30px;
}
.inputbutton {
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
  margin-bottom: 10px;
}
.shoudongtext {
  color: rgb(0, 138, 201);
  font-size: 30px;
  font-weight: bold;
}
.inputnum {
  margin-top: 40px;
  width: 90%;
}
.plainbutton {
  margin-top: 30px;
  width: 140px;
}
</style>