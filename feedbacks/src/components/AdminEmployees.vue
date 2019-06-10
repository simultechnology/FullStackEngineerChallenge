<template>
  <div class="Employees">
    <h3>Admin Employees</h3>
    <div class="card">
      <div class="card-header">
        Add a new employee!
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>Name</label>
            <input v-model="employeeData.name" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">Add</button>
            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Employee List
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">
                  Employee ID
                </th>
                <th>
                  Employee Name
                </th>
                <th>
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="employee in sortedEmployees" v-bind:key="employee.id">
                <template v-if="editId == employee.id">
                  <td>{{editEmployeeData.id}}</td>
                  <td><input v-model="editEmployeeData.name" type="text"></td>
                  <td>
                    <span class="icon">
                      <i  @click="onEditSubmit(employee.id)" class="fa fa-check"></i>
                    </span>
                    <span class="icon">
                      <i  @click="onCancel" class="fa fa-ban"></i>
                    </span>
                  </td>
                </template>
                <template v-else>
                  <td>
                    {{employee.id}}
                  </td>
                  <td>
                    {{employee.name}}
                  </td>
                  <td>

                    <a href="#" class="icon">
                      <font-awesome-icon icon="trash-alt" v-on:click="onDelete(employee.id)" />
                    </a>
                    <a href="#" class="icon">
                      <font-awesome-icon icon="pencil-alt" v-on:click="onEdit(employee)" />
                    </a>
                    <router-link 
                    :to="{
                      name:'AdminEmployeePage',
                      params:{id: employee.id}
                    }" 
                    class="icon"
                    >
                      <font-awesome-icon icon="eye" />
                    </router-link>
                  </td>
                </template>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import axios from 'axios'
import SERVER_URL from '../constants'

export default {
  name: 'AdminEmployees',
  data () {
    return {
      editId: '',
      employeeData: {
        'id' : '',
        'name': ''
      },
      editEmployeeData: {
        'id' : '',
        'name': ''
      },
      employees: []
    }
  },
  created() {
    this.getEmployees()
  },
  computed:{
    sortedEmployees(){
      return this.employees.slice().sort((a, b)=>{
        return a.id - b.id
      })
    }
  },
  methods: {
    async getEmployees() {

      let employees = this.$session.get('employees')
      console.log(employees)
      if (employees) {
        this.employees = employees
      }
      employees = await axios.get(`${SERVER_URL}employees`)
      this.employees = employees.data
      this.$session.set('employees', employees.data)
    },
    async onSubmit(){
      console.log(this.employeeData.name)

      const params = new URLSearchParams();
      params.append('id', this.employeeData.id)
      params.append('name', this.employeeData.name)

      await axios.post(`${SERVER_URL}employee`, params)
      this.getEmployees()

      this.employeeData.name = ''

    },
    async onDelete(id){
      const res = await axios.delete(`${SERVER_URL}employee`, { params: { 'id':id }})
      if (res.status === 200) {
        let employees = this.$session.get('employees')
        console.log(employees)
        if (employees) {
          this.employees = employees.filter(employee => employee.id !== id)
        }
        this.getEmployees()
      }
    },
    onEdit(employee){
      this.editId = employee.id
      this.editEmployeeData.name = employee.name
    },
    onCancel(){
      this.editId = ''
      this.editEmployeeData.id = ''
      this.editEmployeeData.name = ''
    },
    async onEditSubmit (id){
      console.log(id)
      const params = new URLSearchParams();
      params.append('id', id)
      params.append('name', this.editEmployeeData.name)

      await axios.put(`${SERVER_URL}employee`, params)
      this.getEmployees()
      this.editId = ''
      this.editEmployeeData.id = ''
      this.editEmployeeData.name = ''
    }
  }
}
</script>

<style scoped>
h3{
  text-align: center;
  margin-top: 30px;
  margin-bottom: 20px;
}
.icon{
  margin-right: 10px;
}
.icon i{
  cursor: pointer;
}
</style>
