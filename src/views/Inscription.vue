<template>
    <div class="flex justify-center items-center min-h-screen pb-40">
        <div class="text-center p-4 w-full max-w-md">
            <img src="@/assets/VBStats.png" alt="logo" class="w-1/2 sm:w-1/5 md:w-1/4 lg:w-1/3 mx-auto mb-6" />
            <p>L'application incontournable pour votre club de volley</p>
            <h2 class="text-1xl font-semibold text-white mb-4 mt-5">Inscription</h2>

            <form @submit.prevent="submitForm" class="space-y-4">
                <div>
                    <label class="block text-sm font-medium text-white">Prénom</label>
                    <input v-model="firstname" type="text" class="input-style" />
                    <span v-if="firstnameMeta.touched && firstnameError" class="error-text">{{ firstnameError }}</span>
                </div>

                <div>
                    <label class="block text-sm font-medium text-white">Nom</label>
                    <input v-model="lastname" type="text" class="input-style" />
                    <span v-if="lastnameMeta.touched && lastnameError" class="error-text">{{ lastnameError }}</span>
                </div>

                <div>
                    <label class="block text-sm font-medium text-white">Email</label>
                    <input v-model="email" type="email" class="input-style" />
                    <span v-if="emailMeta.touched && emailError" class="error-text">{{ emailError }}</span>
                </div>

                <div>
                    <label class="block text-sm font-medium text-white">Mot de passe</label>
                    <input v-model="password" type="password" class="input-style" />
                    <span v-if="passwordMeta.touched && passwordError" class="error-text">{{ passwordError }}</span>
                </div>

                <div>
                    <label class="block text-sm font-medium text-white">Confirmation du mot de passe</label>
                    <input v-model="passwordConf" type="password" class="input-style" />
                    <span v-if="passwordConfMeta.touched && passwordConfError" class="error-text">{{ passwordConfError
                        }}</span>
                </div>

                <div class="text-center">
                    <button type="submit" class="px-6 py-2 text-white bg-yellow-500 rounded-md hover:bg-yellow-600">
                        S'inscrire
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import axios from 'axios';
import { useField, useForm } from 'vee-validate';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
const router = useRouter();
const schema = yup.object({
    firstname: yup.string().required('Le prénom est requis'),
    lastname: yup.string().required('Le nom est requis'),
    email: yup.string().email('Email invalide').required('Email requis'),
    password: yup.string().min(6, 'Minimum 6 caractères').required('Mot de passe requis'),
    passwordConf: yup
        .string()
        .oneOf([yup.ref('password')], 'Les mots de passe ne correspondent pas')
        .required('Confirmation requise'),
})

const { handleSubmit } = useForm({
    validationSchema: schema,
})

const { value: firstname, errorMessage: firstnameError, meta: firstnameMeta } = useField('firstname')
const { value: lastname, errorMessage: lastnameError, meta: lastnameMeta } = useField('lastname')
const { value: email, errorMessage: emailError, meta: emailMeta } = useField('email')
const { value: password, errorMessage: passwordError, meta: passwordMeta } = useField('password')
const { value: passwordConf, errorMessage: passwordConfError, meta: passwordConfMeta } = useField('passwordConf')

const onSubmit = async (values) => {
    try {
        console.log("Valeurs envoyées :", values);
        const response = await axios.post('http://localhost:8082/api/user/create', {
            firstname: values.firstname,
            lastname: values.lastname,
            email: values.email,
            password: values.password
        });

        console.log('Utilisateur inscrit :', response.data);
        router.push('/connexion');
    } catch (error) {
        if (error.response) {
            alert(`Erreur du serveur : ${error.response.data}`);
        } else {
            alert('Erreur réseau, impossible de joindre le serveur.');
        }
    }
}
const submitForm = handleSubmit(onSubmit); // ⚠️ Doit être après onSubmit et handleSubmit
</script>

<style scoped>
.input-style {
    border: 1px white solid;
    border-radius: 7px;
    @apply w-full px-4 py-2 border border-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500;
}

.error-text {
    @apply text-red-500 text-xs block mt-1;
    display: block;
}
</style>