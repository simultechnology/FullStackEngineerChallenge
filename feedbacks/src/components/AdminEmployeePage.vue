<template>
	<div class="single-employee">
		<div v-if="loaded">
			<h3>Employee details</h3>
			<div class="card">
				<div class="card-header">
					header
				</div>
				<div class="card-body">
					<p>ID: {{employeeId}}</p>
					<p>Employee Name: {{employeeName}}</p>
					<div>
						Feedback:<br>
						<table class="table">
							<thead>
							<tr>
								<th scope="col">Employee ID</th>
								<th scope="col">Employee Name</th>
								<th scope="col">Feedback</th>
							</tr>
							</thead>
							<tbody>
							<tr v-for="review in sortedReviews" v-bind:key="review.employee_id">
								<th scope="row">{{review.employee_id}}</th>
								<td>{{review.employee_name}}</td>
								<td>{{review.feedback}}</td>
							</tr>
							</tbody>
						</table>
					</div>
					<div>
						<b-button v-b-modal.modal-1 v-on:click="getEmployeesForFeedback(employeeId)">add Feedback Employee</b-button>

						<b-modal id="modal-1" title="add Employee for Feedback">
							<ul class="list-group" v-for="employee in sortedEmployees" v-bind:key="employee.id">
								<li class="list-group-item">
									{{employee.id}}, {{employee.name}}
									<span style="position: absolute; right: 5px; top: 5px;">
										<button class="btn btn-success" v-on:click="onAdd(employee)" >Add</button>
									</span>
								</li>
							</ul>
						</b-modal>
					</div>
					<router-link :to="'/admin'" class="btn btn-primary"> Back</router-link>
				</div>
			</div>
		</div>
		<div v-else>
			<h3>Loading...</h3>
		</div>
	</div>
</template>

<script>
	// import db from '@/db'
	import axios from 'axios'
	import SERVER_URL from '../constants'

	export default {
		name: 'AdminEmployeePage',
		data() {
			return {
				employeeId: '',
				employeeName: '',
				employeeReviews: [],
				employees: [],
				loaded: false
			}
		},
		async beforeCreate() {

			const employeeId = this.$route.params.id
			let employee;
			let employees = this.$session.get('employees')
			if (employees && employees.map(employee => employee.id).includes(employeeId)) {
				employee = await employees.filter(employee => employee.id === employeeId)[0]
			} else {
				const res = await axios.get(`${SERVER_URL}employee`, {
					params: {
						id: this.$route.params.id
					}
				})
				employee = res.data
			}

			this.employeeId = employee.id
			this.employeeName = employee.name
			this.employeeReviews = employee.reviews || []
			this.employees = employees || []
			this.loaded = true
		},
		computed: {
			sortedReviews() {
				return this.employeeReviews.filter(review => {
							return this.employees.map(employee => employee.id).includes(review.employee_id)
						}
				).sort((a, b) => a.employee_id - b.employee_id)
			},
			sortedEmployees(){
				return this.employees
						.filter(employee => employee.id !== this.employeeId)
						.sort((a, b) => a.id - b.id)
			}
		},
		methods: {
			getEmployeesForFeedback(employeeId) {
				console.log(employeeId)
			},
			async onAdd(employee) {
				this.employeeReviews.push({
					employee_id: employee.id,
					employee_name: employee.name
				})

				const params = new URLSearchParams();
				params.append('id', this.employeeId)
				params.append('name', this.employeeName)
				params.append('reviews', JSON.stringify(this.employeeReviews))

				await axios.put(`${SERVER_URL}employee`, params)

				const employees = await axios.get(`${SERVER_URL}employees`)
				this.employees = employees.data
				this.$session.set('employees', employees.data)
			}
		}
	}
</script>

<style scoped>
	h3 {
		text-align: center;
		margin-top: 30px;
		margin-bottom: 20px;
	}

</style>
