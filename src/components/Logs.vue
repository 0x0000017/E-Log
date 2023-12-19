<template>

  <div v-if="isLoggedIn">
    <div class="container animate__animated animate__fadeIn">
      
      <div class="row">
        <div class="col">
          <h2 class="mb-5">Logs</h2>
        </div>
        <div class="col"></div>
        <div class="col rightSide">
          <!-- <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#history">History</button> -->
          <input v-model="searchTerm" class="form-control mb-4" id="tableSearch" type="text" placeholder="Search...">
        </div>
      </div>
      
      <h5>Motorcycle</h5>
      <div class="small-table">
        <table class="table table-dark logtable" ref="pdfTable">
          <thead>
            <tr>
              <th scope="col" class="" >Date</th>
              <th scope="col">Slot No.</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(motorcycle, index) in motorcycle" :key="index" @click="showDetails(motorcycle)">
              <th scope="row" >{{ motorcycle.p_date }}</th>
              <td>{{ motorcycle.p_spot }}</td>
              <td>{{ motorcycle.p_name }}</td>
              <td :style="{ color: motorcycle .status === 1 ? 'green' : 'red' }">
                {{ motorcycle .status == 1 ? 'ACTIVE' : 'INACTIVE' }}</td>
              <td class="actionCol">
                  <button @click="deleteLog(index, 'motorcycle')" :class="['btn', 'btn-sm', { 'btn-danger': motorcycle .status == 0, 'btn-success': motorcycle .status == 1 }]" :disabled="motorcycle .status == 0">
                    <i :class="{'fas fa-trash-alt': motorcycle .status == 0, 'fas fa-check': motorcycle .status == 1}"></i>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>


      <h5>Cars</h5>
      <div class="small-table">
        <table class="table table-dark logtable" ref="pdfTable">
          <thead>
            <tr>
              <th scope="col" class="" >Date</th>
              <th scope="col">Slot No.</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(car, index) in filteredLogs" :key="index" @click="showDetails(car)">
              <th scope="row" >{{ car.p_date }}</th>
              <td>{{ car.p_spot }}</td>
              <td>{{ car.p_name }}</td>
              <td :style="{ color: car.status === 1 ? 'green' : 'red' }">
                {{ car.status == 1 ? 'ACTIVE' : 'INACTIVE' }}</td>
              <td class="actionCol">
                  <button @click="deleteLog(index, 'car')" :class="['btn', 'btn-sm', { 'btn-danger': car.status == 0, 'btn-success': car.status == 1 }]" :disabled="car.status == 0">
                    <i :class="{'fas fa-trash-alt': car.status == 0, 'fas fa-check': car.status == 1}"></i>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="exportPdf mt-2">
        <div class="row">
          <div class="col-5"></div>
          <div class="col-5"></div>
          <div class="col rightSide">
            <button type="button" class="btn btn-primary btn-sm exportBtn" @click="exportToPDF">Export to PDF</button>
          </div>
        </div>
      </div>

      <div class="details mt-5">
        <div class="row mb-3">
          <div class="col">
            <h3>Details</h3>
          </div>
          <div class="col"></div>
          <div v-if="selectedLog" class="col rightSide">
            <button type="button" class="btn-close btn-sm" @click="showDetails(log)"></button>
          </div>
        </div>
        
        <span v-if="!selectedLog">Tap on a record to view the details.</span>
        <div v-if="selectedLog" class="row">
          <div class="col">
            <p><span class="label">Name:</span> {{ selectedLog.p_name }}</p>
            <p><span class="label">Phone #:</span> 0{{ selectedLog.p_phone }}</p>
            <p><span class="label">Vehicle Parked: </span> {{ selectedLog.p_vtype == 'car' ? 'Car' : 'Motorcycle'}}</p>
          </div>
          <div class="col">
            <p><span class="label">Vehicle Brand: </span>{{ selectedLog.p_vbrand }}</p>
            <p><span class="label">Vehicle Model: </span>{{ selectedLog.p_vmodel }}</p>
            <p><span class="label">Plate Number: </span>{{ selectedLog.p_plateNo }}</p>
          </div>
          <div class="col">
            <p><span class="label">Time In: </span>{{ selectedLog.p_date }} {{ selectedLog.p_time }}</p>
            <p v-if="selectedLog.p_out"><span class="label">Time Out: </span>{{ selectedLog.p_out }}</p>
            <p><span class="label">Status: </span> <span :class="{ 'active': selectedLog.status == 1, 'inactive': selectedLog.status == 0 }"> {{ selectedLog.status == 1 ? 'ACTIVE' : 'INACTIVE' }} </span></p>
          </div>
        </div>
      </div>
      
    </div>
  </div>

  <div v-else class="bypassLogin">
      <div class="center-container">
        <p style="font-size: 1.2rem; font-weight: 700;">You are not logged in. Please <router-link to="/login">log in</router-link> to access the main menu.</p>
      </div>
  </div>
    

</template>
  
<script>
  import { mapState } from 'vuex';
  import { format } from 'date-fns';
  import html2canvas from 'html2canvas';
  import jsPDF from 'jspdf';

  export default {
    data() {
      return {
        cars: [],
        motorcycle: [],
        selectedLog: null,
        selectedHistory: null,
        currentDate: null,
        searchTerm: "",
      };
    },

    methods: {
      async fetchMotor() {
        try {
          const response = await fetch('http://localhost/api/api.php?vtype=motorcycle', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const responseData = await response.json();
            this.motorcycle  = responseData;
            console.log('Motor', responseData);
          } else {
            console.error('Failed to fetch logs');
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      },

      async fetchCars() {
        try {
          const response = await fetch('http://localhost/api/api.php?vtype=car', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const carData = await response.json();
            this.cars = carData;
            console.log('Car', carData);
          } else {
            console.error('Failed to fetch logs');
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      },

      async deleteCar(index) {
        const logId = this.logs[index].p_id;
        try {
        
          const currentDate = format(new Date(), 'yyyy-MM-dd h:mm a');
          const response = await fetch('http://localhost/api/api.php', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              action: 'updateStatus',
              p_id: logId,
              status: 0,
              out: currentDate,
            }),
          });

          if (response.ok) {
            const responseData = await response.json();
            console.log(responseData.message);
            this.fetchLogs();

              } else {
                  console.error('Failed to update status');
              }
        } catch (error) {
            console.error('Error updating status:', error);
        }
      },

      deleteLog(index, vehicleType) {
        let log;
        let logsArray;
        const currentDate = format(new Date(), 'yyyy-MM-dd h:mm a');

        if (vehicleType === 'motorcycle') {
          log = this.motorcycle[index];
          logsArray = this.motorcycle;
        } else if (vehicleType === 'car') {
          log = this.filteredLogs[index];
          logsArray = this.filteredLogs;
        } else {
          console.error('Invalid vehicle type');
          return;
        }

        const apiUrl = 'http://localhost/api/api.php';

        fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(
            { 
              action: 'updateStatus',
              p_id: log.p_id,
              status: 0,
              out: currentDate,
            }),
        })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            logsArray.splice(index, 1, { ...log, status: 0 });
            console.log('Log deleted successfully');
          })
          .catch(error => {
            console.error('Error deleting log', error);
          });
      },

      showDetails(details) {
        this.selectedLog = details;
      },

      showHistoryDetails(history) {
        this.selectedHistory = history;
      },

      exportToPDF() {
        const pdfTable = this.$refs.pdfTable;
        const actionColumnHeaders = pdfTable.querySelectorAll('.logtable th:nth-child(5), .logtable td:nth-child(5)');
        actionColumnHeaders.forEach(header => header.style.display = 'none');
        const currentDate = new Date().toLocaleString();

        html2canvas(pdfTable, { scale: 1 })
          .then(canvas => {
            const pdf = new jsPDF('p', 'mm', 'a4');
            const scaleFactor = 0.9;
            const newWidth = pdf.internal.pageSize.width * scaleFactor;
            const newHeight = (canvas.height * newWidth) / canvas.width;
            const xPosition = (pdf.internal.pageSize.width - newWidth) / 2;
            let  yPosition = 10;
            pdf.text(`Logs as of ${currentDate}`, 10, yPosition);
            yPosition += 10;
            pdf.addImage(canvas.toDataURL('image/png'), 'PNG', xPosition, yPosition, newWidth, newHeight);
            actionColumnHeaders.forEach(header => header.style.display = '');
            pdf.save('LOGS.pdf');
          });
      },

    },

    mounted() {
      this.fetchMotor();
      this.fetchCars();
    },

    computed: {
      ...mapState(['isLoggedIn']),
      filteredLogs() {
        const lowerSearchTerm = this.searchTerm.toLowerCase();
        return this.cars.filter((car) =>
          car.p_name.toLowerCase().includes(lowerSearchTerm) ||
          car.p_spot.toString().toLowerCase().includes(lowerSearchTerm)
        );
      },
    },
  };
</script>

<style scoped>
    .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .small-table {
      max-height: 300px!important;
      overflow-y: auto;
      border-radius: 10px;
    }
    .small-table::-webkit-scrollbar {
      display: none;
    }

    .details {
      background-color: #212529;
      padding: 10px;
      margin-top: 10px;
      border-radius: 10px;
      font-size: 0.9rem;
    }
    .actionCol {
      text-align: center;
    }

    .active {
      color: green;
    }
    .inactive {
      color: red;
    }
    .details .label {
      font-weight: 700;
    }

    .rightSide {
      display: flex;
      justify-content: flex-end;
      align-items: flex-start;
    }
    .modal-content {
      background-color: #22222F;
      color: #fff;
    }
    .btn-close {
      background-color: #fff;
    }
    .modal-title {
      font-weight: 700;
    }

    .bypassLogin {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .center-container {
      text-align: center;
    }

    .exportBtn {
      border-radius: 20px;
    }

    @media screen and (min-width: 768px) {
      .exportBtn {
        width: 15vw;
      }
    }

    @media screen and (max-width: 320px) {
    .hide-item-number {
      display: none;
    }
  }
</style>
  