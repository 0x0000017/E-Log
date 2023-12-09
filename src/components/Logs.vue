<template>

  <div v-if="isLoggedIn">
    <div class="container animate__animated animate__fadeIn">
      
      <div class="row">
        <div class="col">
          <h2 class="mb-5">Logs</h2>
        </div>
        <div class="col"></div>
        <div class="col rightSide">
          <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#history">History</button>
        </div>
      </div>
  
      <div class="small-table">
        <table class="table table-dark logtable">
          <thead>
            <tr>
              <th scope="col">Item No.</th>
              <th scope="col">Slot No.</th>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(log, index) in logs" :key="index" @click="showDetails(log)">
              <th scope="row">{{ index + 1 }}</th>
              <td>{{ log.p_spot }}</td>
              <td>{{ log.p_name }}</td>
              <td :style="{ color: log.status === 1 ? 'green' : 'red' }">
                {{ log.status == 1 ? 'ACTIVE' : 'INACTIVE' }}</td>
              <td class="actionCol">
                  <button @click="deleteLog(index)" class="btn btn-danger btn-sm" :disabled="log.status == 0">
                      <i class="far fa-trash-alt"></i>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
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
            <p><span class="label">Status: </span> <span :class="{ 'active': selectedLog.status == 1, 'inactive': selectedLog.status == 0 }"> {{ selectedLog.status == 1 ? 'ACTIVE' : 'INACTIVE' }} </span></p>
          </div>
        </div>
      </div>
  
      <div class="prevPanel">
        <div class="row">
          <div class="col"></div>
          <div class="col">
            <router-link to="/menu">
              <button class="btn btn-primary custom-btn circleBtn" @mouseover="hoverEffect" @mouseleave="resetEffect">
                <img :src="require('@/assets/back-btn.png')" alt="">
              </button>
            </router-link>
          </div>
          <div class="col"></div>
        </div>
      </div>
      
      </div>

      <div class="modal fade" id="history" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">History</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="small-table">
              <table class="table table-dark custom-table">
                <thead>
                  <tr>
                    <th scope="col">Slot No.</th>
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(items, index) in history" :key="index" @click="showHistoryDetails(items)">
                    <td>{{ items.p_spot }}</td>
                    <td>{{ items.p_name }}</td>
                    <td>
                      {{ items.p_date }}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="details mt-5">
              <div class="row mb-3">
                <div class="col">
                  <h3>Details</h3>
                </div>
                <div class="col"></div>
                <div v-if="selectedHistory" class="col rightSide">
                  <button type="button" class="btn-close btn-sm" @click="showHistoryDetails(items)"></button>
                </div>
              </div>
              
              <span v-if="!selectedHistory">Tap on a record to view the details.</span>
              <div v-if="selectedHistory" class="row">
                <div class="col">
                  <p><span class="label">Name:</span> {{ selectedHistory.p_name }}</p>
                  <p><span class="label">Phone #:</span> 0{{ selectedHistory.p_phone }}</p>
                  <p><span class="label">Vehicle Parked: </span> {{ selectedHistory.p_vtype == 'car' ? 'Car' : 'Motorcycle'}}</p>
                </div>
                <div class="col">
                  <p><span class="label">Vehicle Brand: </span>{{ selectedHistory.p_vbrand }}</p>
                  <p><span class="label">Vehicle Model: </span>{{ selectedHistory.p_vmodel }}</p>
                  <p><span class="label">Plate Number: </span>{{ selectedHistory.p_plateNo }}</p>
                </div>
                <div class="col">
                  <p><span class="label">Time In: </span>{{ selectedHistory.p_date }} {{ selectedHistory.p_time }}</p>
                  <p><span class="label">Time Out: </span>{{ selectedHistory.p_out }}</p>
                  <p><span class="label">Status: </span> <span :class="{ 'active': selectedHistory.status == 1, 'inactive': selectedHistory.status == 0 }"> {{ selectedHistory.status == 1 ? 'ACTIVE' : 'INACTIVE' }} </span></p>
                </div>
              </div>
            </div>

          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
      </div>
  </div>

  <div v-else class="bypassLogin">
      <div class="center-container">
        <p style="font-size: 1.2rem; font-weight: 700;">You are not logged in. Please <router-link to="/login" @click="redirectToLogin">log in</router-link> to access the main menu.</p>
      </div>
  </div>
    

</template>
  
<script>
import { mapState } from 'vuex';
import { format } from 'date-fns';
  export default {
    data() {
      return {
        logs: [],
        history: [],
        selectedLog: null,
        selectedHistory: null,
        currentDate: null,
      };
    },

    computed: {
    ...mapState(['isLoggedIn']),
    },

    mounted() {
      this.fetchLogs();
      this.fetchInactiveLogs();
    },

    methods: {
      async fetchLogs() {
        try {
          const response = await fetch('http://localhost/api/api.php?status=1', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const responseData = await response.json();
            this.logs = responseData;
            console.log(responseData);
          } else {
            console.error('Failed to fetch logs');
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      },

      async fetchInactiveLogs() {
        try {
          const response = await fetch('http://localhost/api/api.php?status=0', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const historyData = await response.json();
            this.history = historyData;
            console.log(historyData);
          } else {
            console.error('Failed to fetch logs');
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      },

      async deleteLog(index) {
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

      showDetails(log) {
        this.selectedLog = log;
      },

      showHistoryDetails(history) {
        this.selectedHistory = history;
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
      justify-content: end;
      align-items: start;
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
</style>
  