<template>
  <div class="outer">
    <HeaderNavbar></HeaderNavbar>

    <div class="form_outer">
      <form>
        <div>
          <div>
            <label for="email">登入信箱 ：</label>
            <input type="text" id="email" placeholder="請輸入登入信箱" v-model.trim="user.username" />
          </div>
          <div>
            <label for="password">密碼 :</label>
            <input type="password" id="password" placeholder="請輸入密碼" v-model.trim="user.password" />
          </div>
          <div>
            <button type="submit" @click.prevent="signin">登入</button>
            <p>{{ notSuccess }}</p>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/composition-api';
import { useRoute } from "@/useRoute.js";
import { useStore } from "@/store";
import HeaderNavbar from '@/layout/HeaderNavbar.vue';
import axios from 'axios';

export default {
  name: 'Login',
  components: {
    HeaderNavbar
  },
  setup() {
    const { router } = useRoute();
    const store = useStore();
    const user = reactive({
      username: '',
      password: ''
    });
    const notSuccess = ref('');

    const signin = () => {
      axios
        .post('https://vue-course-api.hexschool.io/signin', user)
        .then(result => {
          const isResultSuccess = result.data.success;
          switch (isResultSuccess) {
            case true:
              router.push('/');
              store.commit('checkSignIn', true);
              break;
            case false:
              notSuccess.value = '沒有登入成功';
              break;
          }
        })
    }

    return {
      user,
      notSuccess,
      signin
    }
  }
}
</script>
<style lang="scss" scoped>
.outer {
  background-color: #494b50;
  margin: 0;
}

.form_outer {
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  margin: 0;
  background-color: #494b50;

  form {
    width: 35%;
    background: #abdadc;
    border-radius: 25px;
    padding: 25px;
    font-size: 24px;
    display: flex;
    justify-content: center;
    box-shadow: 2px 2px 8px black;

    div {
      margin: 15px;

      label {
        display: block;
        margin: 5px 0;
      }

      input {
        width: 85%;
        height: 25px;
        border: none;
        border-radius: 10px;
        outline: none;
        padding: 5px 15px;
      }

      button {
        display: block;
        width: 100px;
        padding: 5px;
        border: none;
        border-radius: 8px;
        margin-top: 25px;
      }

      p {
        text-align: center;
        color: yellow;
      }
    }
  }
}

@media (max-width: 960px) {
  .form_outer {
    form {
      width: 45%;

      div {
        margin: 0;

        input {
          width: 90%;
        }
      }
    }
  }
}

@media (max-width: 540px) {
  .form_outer {
    form {
      width: 75%;

      div {
        margin: 0;

        input {
          width: 90%;
        }
      }
    }
  }
}</style>
