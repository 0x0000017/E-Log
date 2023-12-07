<template>

    <div class="container animate__animated animate__fadeIn">
      
      <div class="row">
        <div class="col">
          <h2 class="mb-5">Logs</h2>
        </div>
        <div class="col"></div>
        <div class="col rightSide">
          <button class="btn btn-primary">History</button>
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
              <td>{{ log.status == 1 ? 'ACTIVE' : 'INACTIVE' }}</td>
              <td>
                  <button @click="deleteLog(index)" class="btn btn-danger" :disabled="log.status == 0">
                      <i class="fa-solid fa-x"></i>
                  </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div v-if="selectedLog" class="details mt-5">
        <h3>Details</h3>
        <div class="row">
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
            <p><span class="label">Time: </span>{{ selectedLog.p_time }}</p>
            <p><span class="label">Date: </span>{{ selectedLog.p_date }}</p>
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
</template>
  
<script>
  export default {
    data() {
      return {
        logs: [],
        selectedLog: null,
      };
    },
    mounted() {
      this.fetchLogs();
    },
    methods: {
      async fetchLogs() {
        try {
          const response = await fetch('http://localhost/api/api.php', {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          });
  
          if (response.ok) {
            const responseData = await response.json();
            this.logs = responseData;
          } else {
            console.error('Failed to fetch logs');
          }
        } catch (error) {
          console.error('Error fetching logs:', error);
        }
      },

      async deleteLog(index) {
        const logId = this.logs[index].p_id;
        console.log(`Deleting log at item # ${logId}`);
        try {
        

        const response = await fetch('http://localhost/api/api.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            action: 'updateStatus',
            p_id: logId,
            status: 0,
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

      hoverEffect() {
      },

      resetEffect() {
      },
    },
  };
</script>

<style scoped>
  .container {
      display: flex;
      flex-direction: column;
      min-height: 100vh; /* Set the container to at least the height of the viewport */
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

</style>
  