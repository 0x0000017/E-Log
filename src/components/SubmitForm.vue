<template>
  <div class="container animate__animated animate__fadeIn">
    <h3 class="pageTitle">Parking Form</h3>
    <h4 class="subtitle"> {{ vehicleType == 'motorcycle' ? 'Motorcycle' : 'Car' }} Slot No. {{ spot }}</h4>
    
    <form class="parkingForm" @submit.prevent="submitForm">
      <div class="mb-3">
        <input v-model="formData.name" type="text" placeholder="Name:" class="form-control" id="name" required>
      </div>
      <div class="mb-3">
        <input v-model="formData.phone" type="text" placeholder="Phone:" class="form-control" id="phone" required>
      </div>
      <div class="mb-3">
        <input v-model="formData.vbrand" type="text" placeholder="Vehicle Brand:" class="form-control" id="vbrand" required>
      </div>
      <div class="mb-3">
        <input v-model="formData.vmodel" type="text" placeholder="Model:" class="form-control" id="vmodel" required>
      </div>
      <div class="mb-3">
        <input v-model="formData.plateNo" type="text" placeholder="Plate #:" class="form-control" id="plateNo" required>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Time</span>
        <input v-model="formData.parkTime" type="time" placeholder="Park Time:" class="form-control" id="parkTime" required>
      </div>
      <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">Date</span>
        <input v-model="formData.parkDate" type="date" placeholder="Date:" class="form-control" id="parkDate" required>
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>

  <div class="prevPanel">
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <router-link to="/choose-vehicle">
              <button class="btn btn-primary custom-btn circleBtn">
                <img :src="require('@/assets/back-btn.png')" alt="">
              </button>
            </router-link>
          </div>
          <div class="col"></div>
        </div>
  </div>

</template>


<style scoped>

  .container {
    text-align: center;
    min-height: 90vh;
  }

  .parkingForm {
    margin-left: 5vw;
    margin-right: 5vw;
    margin-top: 5vw;
  }
  .parkingForm .btn {
    margin-top: 5vw;
    border-radius: 15px;
    width: 20vw;
  }

  .pageTitle {
    font-size: 50px;
    font-weight: 700;
    letter-spacing: 4px;
  }
  .subtitle {
    font-size: 30px;
    font-weight: 700;
  }

  .prevPanel {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    margin-top: auto;
  }

  .circleBtn {
    width: 100px;
    background-color: #515478;
    border-radius: 25px;
  }
</style>

<script>
import Swal from 'sweetalert2';
export default {
  data() {
    return {
      formData: {
        action: 'submitForm',
        name: '',
        phone: '',
        vbrand: '',
        vmodel: '',
        plateNo: '',
        parkTime: '',
        parkDate: '',
        spot: this.$route.params.spot,
        vtype: this.$route.params.vehicleType
      },
      vehicleType: null,
      spot: null
    };
  },
  methods: {
    async submitForm() {
      try {
        const response = await fetch('http://localhost/api/api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.formData),
        });

        if (response.ok) {
          const responseData = await response.json();
          console.log('OK:', responseData);
          
          Swal.fire({
            icon: 'success',
            title: 'OK',
            showCancelButton: false,
            confirmButtonText: 'OK',
          }).then(() => {
            this.$router.push('/');
          });

        } else {
          console.error('Failed to submit.');

          Swal.fire({
            icon: 'error',
            title: 'Failed to submit.',
            showCancelButton: false,
            confirmButtonText: 'OK',
          });

        }
      } catch (error) {
        console.error('Error submitting form:', error);

        Swal.fire({
          icon: 'error',
          title: 'Error submitting form',
          showCancelButton: false,
          confirmButtonText: 'OK',
        });

      }
    },
  },
  mounted() {
    this.vehicleType = this.$route.params.vehicleType;
    this.spot = this.$route.params.spot;
  }
};
</script>