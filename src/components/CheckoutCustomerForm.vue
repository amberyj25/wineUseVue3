<template>
  <div class="container">
    <form>
      <div
        v-for="(formItem, formItemNum) in formGroup"
        :key="formItemNum"
      >
        <label :for="formItem.for">{{ formItem.title }}</label>
        <input
          type="text"
          :id="formItem.id"
          :placeholder="formItem.placeholder"
          v-model="customerInfo[formItem.id]"
        >
      </div>
      <div>
        <label for="message">備註 :</label>
        <textarea
          rows="5"
          cols="50"
          id="message"
          v-model="customerInfo.message"
        ></textarea>
      </div>
    </form>
    <div class="submit">
      <div
        v-for="(btn, btnNum) in submitBtn"
        :key="btnNum"
        :class="btn.class"
        @click="changePage(btn)"
      >{{ btn.title }}</div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckoutCustomerForm',
  data () {
    return {
      formGroup: [
        {
          title: '姓名 :',
          for: 'name',
          id: 'name',
          placeholder: '請輸入姓名'
        }, {
          title: '信箱 :',
          for: 'email',
          id: 'email',
          placeholder: 'ex.amber@gmail.com'
        }, {
          title: '手機號碼 :',
          for: 'phone',
          id: 'phone',
          placeholder: 'ex.0989-768-701'
        }, {
          title: '地址 :',
          for: 'address',
          id: 'address',
          placeholder: 'ex.台中市.....'
        }
      ],
      customerInfo: {
        name: '',
        email: '',
        phone: '',
        address: '',
        message: ''
      },
      submitBtn: [
        {
          title: '上一步',
          class: 'btn_Previous_page'
        }, {
          title: '送出訂單',
          class: 'btn_submit'
        }
      ]
    }
  },
  methods: {
    changePage (btn) {
      switch (btn.title) {
        case '上一步':
          this.$emit('changeComponent', 'CheckoutShoppingCartContent')
          break
        case '送出訂單':
          break
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  width: 85%;
  margin: auto;
  form {
    label, input, textarea {
      margin: 5px 0;
    }
    label {
      display: block;
    }
    input, textarea {
      width: 100%;
      padding: 5px;
      border: 1px solid gray;
      border-radius: 5px;
    }
  }
  .submit {
    display: flex;
    justify-content: center;
    .btn_Previous_page, .btn_submit {
      padding: 5px 25px;
      border-radius: 5px;
      margin: 0 25px;
      text-align: center;
    }
    .btn_Previous_page {
      border: 2px solid blueviolet;
      &:hover {
        color: white;
        background-color:#FF3EFF;
        cursor: pointer;
      }
    }
    .btn_submit {
      border: 2px solid red;
      &:hover {
        color: white;
        background-color: #fe5050;
        cursor: pointer;
      }
    }
  }
}
</style>
