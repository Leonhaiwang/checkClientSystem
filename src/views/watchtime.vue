<template>
  <div class="watchtime">
    <div class="inputbutton">
    <div class="button01">
      <download-excel name="ExportUesrTimer.xls" :data="daochuExcel">
      <el-button class="btn1" type="primary" plain>导出信息</el-button>
    </download-excel>
    </div>
    <div>
      <el-input
            clearable
            placeholder="输入关键字搜索"
            prefix-icon="el-icon-search"
            v-model="searchText"
            @input = "inputChange"
            >
        </el-input>
    </div>
    
    </div>
    <el-table
      :data="tableData"
      stripe
      max-height="500px"
      style="width: 100%"
      :default-sort="{prop: 'week', order: 'descending'}"
      
      :row-style="{height:'20px'}"
    >
      <el-table-column prop="username" label="姓名"  v-show="isShow"></el-table-column>
      <el-table-column prop="uid" v-if="a!=='人脸'" label="学号" ></el-table-column>
      <el-table-column prop="class" :label="a==='人脸'?'所在教室':'班级'"></el-table-column>
      <el-table-column prop="mon" label="周一" ></el-table-column>
      <el-table-column prop="tues" label="周二" ></el-table-column>
      <el-table-column prop="wed" label="周三"></el-table-column>
      <el-table-column prop="thur" label="周四" ></el-table-column>
      <el-table-column prop="fri" label="周五" ></el-table-column>
      <el-table-column prop="sat" label="周六"></el-table-column>
      <el-table-column prop="sun" label="周日" ></el-table-column>
      <el-table-column prop="week" label="当前周" sortable width="180"></el-table-column>
    </el-table>
    <div class="block">
    
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[ 9, 13,20]"
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
      tableData: [],
      newtableData:[],
      searchValueData:[],
      a: "扫码",
      isShow: true,
      type:'', 
      currentPage:1,//当前页
      total:0,//总条数
      number:9,//每页number条
      searchText:'',
      daochuExcel:[],
      timer : ''
    };
  },
  methods: {
     searchValue(str){
       console.log(1)
      this.searchValueData = []
      this.newtableData.forEach((el)=>{
        if(el.username.indexOf(str)!==-1 || el.class.indexOf(str)!==-1 || el.week.indexOf(str)!==-1  || el.uid.indexOf(str)!==-1){
          this.searchValueData.push(el) 
        }  
      })
      this.total = this.searchValueData.length
      this.daochuExcel = this.searchValueData
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
    async getAllFacTimer() { 
      
       if(this.type === "1"){//人脸
        const { data } = await this.$http.get(`/getAllUserTimer?type=${this.type}`);
        this.newtableData = data.data;
        this.daochuExcel = data.data
        this.total = data.data.length
       }else if(this.type === "2"){
        const { data } = await this.$http.get(`/getAllUserTimer?type=${this.type}`);
        this.daochuExcel = data.data
        this.newtableData = data.data;
        this.total = data.data.length
       }
       this.getTableData()
    },
    getA() {
      var token = localStorage.getItem("a");
      this.a = token
      var T = localStorage.getItem('type')
      this.type = T
    }
  },
  created() {
    //先获取值，再进行判断
    this.getA();
    this.getAllFacTimer()
    
  }
};
</script>
<style scoped>
.button01{
  margin-top: 10px;
}
.inputbutton {
  display: flex;
  justify-content: space-between;
  margin-top: -10px;
  margin-bottom: 10px;
}
.block{
  margin-top: 15px;
}
.el-table th>.cell{
  font-size: 20px !important;
}
.btn1 {
  /* position: fixed;
    top: 75px;
    left: 85%;
*/
  margin-top: -10px;
  margin-bottom: 10px;
}
</style>