<template>
	<div class="header">
		<nav class="navbar navbar-light bg-light navbar-expand-lg">
			<div class="container">
				<router-link class="navbar-brand" to="/">Feedback System</router-link>
				<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
								aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
					<span class="navbar-toggler-icon"></span>
				</button>
				<div class="collapse navbar-collapse" id="navbarNav">
					<ul class="navbar-nav">
						<li class="nav-item active">
							<router-link to="/" class="nav-link">Home</router-link>
						</li>
						<li class="nav-item active">
							<router-link to="/admin" class="nav-link">Admin</router-link>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</div>
</template>

<script>
	export default {
		name: 'AdminEmployees',
		data() {
			return {}
		}
	}
</script>

<style scoped>
	h1, h2 {
		font-weight: normal;
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
