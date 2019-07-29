<template>
	<div data-active="true">
		<slot v-bind="{ doSomething, files, onInputChange }">
			<input type="file" @change="onInputChange">
		</slot>
	</div>
</template>

<script>
export default {
	name: 'DDUploader',
	data () {
		return {
			files: []
		}
	},
	methods: {
		onInputChange (e) {
			this.files.push(...e.target.files)
			e.target.value = null
			console.log(this.files)
		},
		doSomething () {
			return 'yo dawg'
		}
	}
}
</script>
