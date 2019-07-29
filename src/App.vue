<template>
	<div id="app">
		<DDUploader class="drop-area">
			<template v-slot:default="{ onInputChange, files }">
				<input type="file" @change="onInputChange" />
				<div v-for="(file, i) of files" :key="i">
					{{ file.name }}
				</div>
			</template>
		</DDUploader>
	</div>
</template>

<script>
import DDUploader from './components/DDUploader.vue'

export default {
	name: 'app',
	components: { DDUploader }
}
</script>

<style scoped>
#app {
	font-family: "Avenir", Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
	margin-top: 60px;
}

.drop-area {
	padding: 50px;
	background: #f0f8ff;
}

.drop-area[data-active=true] {
	border: 2px dashed black;
}
</style>
