<template>
  <div v-if="isLoggedIn">
    <div class="container  animate__animated animate__fadeIn ">
      <div class="heading">
        <h2>Choose Parking Spot</h2>
        <p>Vehicle Type: {{ vehicleType == 'motorcycle' ? 'MOTORCYCLE' : 'CAR' }}</p>
      </div>
      <div class="row mt-5 mb-5">
        <div class="col">
          <table class="table table-dark">
            <tbody>
              <tr v-for="(row, rowIndex) in spotsInRows" :key="rowIndex">
                <td v-for="(spot, colIndex) in row" :key="colIndex">
                  <router-link 
                  :class="'parkCell'" 
                  :to="getLinkTo(spot[0])"
                  >
                    <div :class="['parking-cell', { 'occupied': parkingStatus[rowIndex * 2 + colIndex] === 'OCCUPIED' }]">
                      <div class="spot-container">
                        <h5 class="spot-number">{{ spot[0] }}</h5>
                        <span class="status-text">{{ parkingStatus[rowIndex * 2 + colIndex] }}</span>
                      </div>
                    </div>
                  </router-link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div class="prevPanel">
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <router-link to="/choose-vehicle">
            <button class="btn btn-primary custom-btn circleBtn" @mouseover="hoverEffect" @mouseleave="resetEffect">
              <img :src="require('@/assets/back-btn.png')" alt="">
            </button>
          </router-link>
        </div>
        <div class="col"></div>
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
  export default {
    data() {
      return {
        spots: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        vehicleType: null,
        spotsData: [],
        fetchedData: [],
      };
    },

    computed: {
      ...mapState(['isLoggedIn']),
      spotsInRows() {
        const numberOfRows = 7;
        const spotsPerRow = 2;
        return Array.from({ length: numberOfRows }, (_, rowIndex) => {
          const startIndex = (rowIndex * spotsPerRow) % 14;
          return this.spots.slice(startIndex, startIndex + spotsPerRow).map((spot) => [spot]);
        });
      },

      parkingStatus() {
        if (!Array.isArray(this.fetchedData) || this.fetchedData.length === 0) {
          return new Array(this.spots.length).fill('VACANT');
        }

        let statusArray = new Array(this.spots.length).fill('');

        this.fetchedData.forEach((row) => {
          if (row && typeof row.p_spot !== 'undefined' && typeof row.status !== 'undefined') {
            const spotIndex = this.spots.indexOf(row.p_spot);

            if (spotIndex !== -1) {
              statusArray[spotIndex] = row.status === 'OCCUPIED' ? 'OCCUPIED' : 'VACANT';
            }
          }
        });

        return statusArray;
      },


      isSpotOccupied() {
        return spotNumber => this.parkingStatus[this.spots.indexOf(spotNumber)] === 'OCCUPIED';
      },

    },

    mounted() {
      this.vehicleType = this.$route.params.vehicleType;
      this.fetchParkingData();
    },

    methods: {
      async fetchParkingData() {
        try {
          const response = await fetch(`http://localhost/api/api.php?vtype=${this.vehicleType}`);
          const data = await response.json();

          this.fetchedData = data;
          console.log('Saved fetched data:', this.fetchedData);

          this.updateParkingStatus(data);
          console.log('Updated parking status (#92):', this.parkingStatus);

        } catch (error) {
          console.error('Error fetching parking data:', error);
        }
      },

      updateParkingStatus(data) {
        let statusArray = new Array(this.spots.length).fill('VACANT');
        data.forEach((row) => {
          const spotIndex = this.spots.indexOf(row.p_spot);
          if (spotIndex !== -1) {
            // Update this condition based on your API response
            statusArray[spotIndex] = row.status === 1 ? 'OCCUPIED' : 'VACANT';
            console.log(`Spot ${this.spots[spotIndex]}: ${statusArray[spotIndex]}`);
          }
        });
        this.parkingStatus.splice(0, this.parkingStatus.length, ...statusArray);
        console.log('Updated parking status array (#110):', statusArray);
      },


      handleCellClick(spot) {
          console.log(`Selected parking spot: ${this.vehicleType} ${spot}`);
      },
      getLinkTo(spotNumber) {
        if (this.isSpotOccupied(spotNumber)) {
          return '#';
        } else {
          return { name: 'submitForm', params: { spot: spotNumber } };
        }
      },
    },
  };
</script>

<style scoped>

  .container {
    min-height: 90vh;
  }
  .heading {
    text-align: center;
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

  .parking-cell {
    background-color: #45a049;
    height: 50px;
    color: white;
    text-align: center;
    text-decoration: none;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    position: relative;
  }

  .parking-cell.occupied {
    background-color: #f44336;
  }

  .parkCell {
    background-color: #45a049;
    text-decoration: none;
  }

  .parking-cell:hover {
    color: #000;
  }

  .spot-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .spot-number {
    font-size: 25px;
    font-weight: 700;
    margin-right: 1vw;
    margin-bottom: 4px;
  }

  .status-text {
    font-size: 10px;
    margin-left: auto;
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

  @media screen and (max-width: 760px) {
    .parking-cell {
      width: 43vw;
  }
}


</style>

