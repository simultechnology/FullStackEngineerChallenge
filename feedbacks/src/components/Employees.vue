<template>
  <div class="Employees">
    <h3>Employees</h3>
    <div class="card">
      <div class="card-header">
        Enter your ID
      </div>
      <div class="card-body">
        <form class="form-inline" v-on:submit.prevent="onSubmit">
          <div class="form-group">
            <label>ID</label>
            <input v-model="employeeData.id" type="text" class="form-control ml-sm-2 mr-sm-4 my-2" required>
          </div>
          <div class="ml-auto text-right">
            <button type="submit" class="btn btn-primary my-2">send</button>
            
          </div>
        </form>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Review about you
      </div>
      <div class="card-body">
        <p>name: {{employeeData.name}}</p>
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
                  Feedback
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="review in employeeData.reviews" v-bind:key="review.employee_id">
                <td>
                  {{review.employee_id}}
                </td>
                <td>
                  {{review.employee_name}}
                </td>
                <td>
                  {{review.feedback}}
                </td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="card mt-5">
      <div class="card-header">
        Enter Review about other Employees
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
                Feedback
              </th>
              <th></th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="employee in employeesToReview" v-bind:key="employee.id">
              <td>
                {{employee.id}}
              </td>
              <td>
                {{employee.name}}
              </td>
              <td>
                <textarea v-model="feedbacks[employee.id]" style="width: 100%;"></textarea>
              </td>
              <td>
                <button type="button" class="btn btn-primary my-2" v-on:click="onEdit(employee.id)">update</button>
                <button type="button" class="btn btn-danger my-2">delete</button>
              </td>
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
      employeeData: {
        'id' : '',
        'name': '',
        'reviews': []
      },
      employees: [],
      employeesToReview: [],
      feedbacks: {}
    }
  },
  methods: {
    async onSubmit(){

      const res = await axios.get(`${SERVER_URL}employee`, {
        params: {
          id: this.employeeData.id
        }
      })
      const employee = res.data
      console.log(employee)
      this.employeeData.name = employee.name
      this.employeeData.reviews = employee.reviews

      let employees = this.$session.get('employees')
      if (employees) {
        this.employees = employees
      }
      employees = await axios.get(`${SERVER_URL}employees`)
      this.employees = employees.data
      this.$session.set('employees', employees.data)

      this.employeesToReview = this.employees.filter(employee => {
        if (employee.id === this.employeeData.id || !employee.reviews) {
          return false
        }
        return employee.reviews.map(review => review.employee_id).includes(this.employeeData.id)
      }).map(employee => {
        const review = employee.reviews.filter(review => review.employee_id === this.employeeData.id)[0]
        const feedback = review.feedback || ''
        this.feedbacks[employee.id] = feedback
        return {
          id: employee.id,
          name: employee.name,
          feedback: feedback,
        }
      })

    },
    async onEdit(employeeId){

      const employee = this.employees.filter(employee => employee.id === employeeId)[0];
      const reviews = employee.reviews || []

      const review = reviews.filter(review => review.employee_id === employeeId)
      if (!review) {
        reviews.push({
          employee_id: this.employeeData.id,
          employee_name: this.employeeData.name,
          feedback: this.feedbacks[employeeId]
        })
      } else {
        reviews.forEach((review, idx) => {
          console.log(review.employee_id)
          if (review.employee_id === this.employeeData.id) {
           reviews[idx].feedback = this.feedbacks[employeeId]
            console.log(reviews)
          }
        })
      }

      const params = new URLSearchParams();
      params.append('id', employee.id)
      params.append('name', employee.name)
      params.append('reviews', JSON.stringify(reviews))

      await axios.put(`${SERVER_URL}employee`, params)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
