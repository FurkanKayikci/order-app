<script>
import Materials from "./components/Materials";
import Customers from "./components/Customers";
import Orders from "./components/Orders";

export default {
  components: {
    Materials,
    Customers,
    Orders,
  },
  data() {
    return {
      activeComponent: 0,
    };
  },
  created() {},
};
</script>

<template>
  <v-app>
    <div id=" app">
      <template> </template>
      <v-card flat>
        <v-toolbar color="#b72145" dark extended flat> </v-toolbar>

        <v-layout row pb-2>
          <v-flex xs8 offset-xs2>
            <v-card class="card--flex-toolbar radius-and-shadow">
              <v-tabs v-model="activeComponent" right hide-slider>
                <v-tab
                  class="tab-default"
                  :class="{ 'active-tab': activeComponent == 0 }"
                  @click="activeComponent = 0"
                >
                  Materials
                </v-tab>
                <v-tab
                  class="tab-default"
                  :class="{ 'active-tab': activeComponent == 1 }"
                  @click="activeComponent = 1"
                >
                  Customers
                </v-tab>
                <v-tab
                  class="tab-default"
                  :class="{ 'active-tab': activeComponent == 2 }"
                  @click="activeComponent = 2"
                >
                  Orders
                </v-tab>

                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-layout>
                        <v-flex xs12>
                          <Materials />
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-layout>
                        <v-flex xs12>
                          <Customers />
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tab-item>

                <v-tab-item>
                  <v-card flat>
                    <v-card-text>
                      <v-layout>
                        <v-flex xs12>
                          <Orders />
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
      <!-- <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link>
      </div> -->
    </div>
  </v-app>
</template>

<style lang="scss">
#app {
  font-family: Roboto, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #333;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.page-title {
  color: #333 !important;
  font-weight: 600 !important;
  text-transform: uppercase;
  letter-spacing: -0.5px !important;
}
.card--flex-toolbar {
  margin-top: -64px;
}

.tab-default {
  cursor: pointer;
  background: #efefef !important;
  color: #333 !important;
  border-radius: 2rem;
  margin: 8px;
  height: auto !important;
  .v-tabs__item {
    border-radius: 2rem;
  }
}
.active-tab {
  background: #b72145 !important;
  color: #fff !important;
}
.v-card__text {
  padding-top: 0 !important;
}

.radius-and-shadow {
  border-radius: 0.5rem !important;
  box-shadow: rgba(0, 0, 0, 0.2) 0px 12px 28px 0px,
    rgba(0, 0, 0, 0.1) 0px 2px 4px 0px,
    rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset !important;
}
</style>
