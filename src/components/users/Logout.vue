<template>
    <div class="container">
        {{message}}
        <router-link v-if="success" to="/">Go Home</router-link>
    </div>
</template>

<script>

    import {UsersService} from "@/services/local/users.service";

    export default {
        name: "Logout",
        data() {
            return {
                message: '',
                success: false,
            }
        },
        mounted() {
            this.message = 'Trying to logout';
            UsersService.logout().then(res => {
                this.message = 'Logged out successfully';
                this.success = true;
            });
        },
        methods: {}
    }
</script>

<style scoped>

</style>
