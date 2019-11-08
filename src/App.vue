<template>
	<div id="app">
		<DDFileInput class="drop-area">
			<template v-slot:input="{ onInputChange, files }">
				<label for="">
					<h1>input field</h1>
					<input type="file" @change="onInputChange" />
				</label>
				<div v-for="(file, i) of files" :key="i">
					{{ file.name }}
				</div>
			</template>
		</DDFileInput>
	</div>
</template>

<script>
import DDFileInput from './components/DDFileInput.vue'

export default {
	name: 'app',
	components: { DDFileInput }
}
</script>

<style scoped>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin: 60px auto 0;
	max-width: 800px;
}

.drop-area {
	padding: 50px;
	background: #c5def3;
}

.drop-area[data-active=true] {
	box-shadow: 0 0 30px rgba(0,0,0,.3);
	background: #96b8d3;
}
</style>
