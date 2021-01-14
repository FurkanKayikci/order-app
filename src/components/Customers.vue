<script>
import { mapActions, mapMutations } from "vuex";
import Loader from "./Loader";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      customersDialog: false,
      customerListIsLoading: true,
      tempArray: [],
      editMode: false,
      rowsPerPageItems: [10, 20, 30, 40],
      pagination: {
        rowsPerPage: 10,
      },
      sortBy: "fat",
      sortDesc: false,
      newCustomer: {
        id: "",
        name: "",
        address: "",
        phone: "",
        email: "",
      },
      customerHeaders: [
        { text: "Name", align: "left", value: "name" },
        { text: "Address", align: "left", value: "address" },
        { text: "Phone", align: "left", value: "phone", sortable: false },
        {
          text: "e-mail",
          align: "left",
          value: "email",
          sortable: false,
        },
        {
          text: "Edit & Detail",
          align: "center",
          value: "edit",
          sortable: false,
        },
      ],
      customerDatas: [],
    };
  },
  methods: {
    ...mapActions([
      "fetchTableDatas",
      "editTableDatas",
      "getStateLength",
      "pushTableDatas",
    ]),
    ...mapMutations(["setCustomers", "addState"]),
    saveNewCustomer() {
      this.customerListIsLoading = true;
      this.getStateLength("customers").then((response) => {
        if (this.editMode) {
          const params = { dataType: "customers", newData: this.newCustomer };
          this.editTableDatas(params)
            .then(({ data }) => {
              this.newCustomer.keyId = data.name;
              this.closeDialog();
            })
            .catch(() => {})
            .finally(() => {
              this.customerListIsLoading = false;
            });
        } else {
          this.newCustomer.id = response;
          const params = { dataType: "customers", newData: this.newCustomer };
          this.pushTableDatas(params)
            .then(({ data }) => {
              this.newCustomer.keyId = data.name;
              this.addState(params);
              this.closeDialog();
            })
            .catch(() => {})
            .finally(() => {
              this.customerListIsLoading = false;
            });
        }
      });
    },
    editCustomer(item) {
      this.editMode = true;
      this.customersDialog = true;
      this.newCustomer = item;
    },
    closeDialog() {
      this.newCustomer = {
        id: "",
        name: "",
        adress: "",
        phone: "",
        email: "",
      };
      this.customersDialog = false;
      this.editMode = false;
    },
  },
  mounted() {
    this.fetchTableDatas("customers")
      .then(({ data }) => {
        const tempArray = [];
        for (let key in data) {
          tempArray.push({ ...data[key], keyId: key });
        }
        this.customerDatas = tempArray;
        this.setCustomers(tempArray);
      })
      .catch(() => {
        console.log("Error fetching customer list!");
        this.customerDatas = [
          {
            id: 1,
            name: "Hatali Veri",
            address: "Hatali Veri",
            phone: "Hatali Veri",
            email: "Hatali Veri",
          },
        ];
      })
      .finally(() => {
        this.customerListIsLoading = false;
      });
  },
};
</script>

<template>
  <div class="customer-component">
    <v-toolbar flat color="white" class="table-info">
      <v-toolbar-title>Customers Table</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="green"
        class="white--text"
        @click="customersDialog = true"
      >
        <v-icon left dark>add</v-icon>
        Add Customer
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="customerHeaders"
      :items="customerDatas"
      :rows-per-page-items="rowsPerPageItems"
      :pagination.sync="pagination"
      :sort-by.sync="sortBy"
      :sort-desc.sync="sortDesc"
      class="elevation-0 table-bg"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.address }}</td>
        <td class="text-xs-left">{{ props.item.phone }}</td>
        <td class="text-xs-left">{{ props.item.email }}</td>
        <td class="text-xs-center">
          <v-flex>
            <v-btn
              flat
              small
              icon
              color="orange"
              @click="editCustomer(props.item)"
            >
              <v-icon>edit</v-icon>
            </v-btn>
            <v-btn flat small icon color="blue">
              <v-icon>info_outline</v-icon>
            </v-btn>
          </v-flex>
        </td>
      </template>
    </v-data-table>
    <Loader v-if="customerListIsLoading" />
    <v-dialog v-model="customersDialog" persistent max-width="960px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Customers</span>
        </v-card-title>
        <v-card-text>
          <Loader v-if="customerListIsLoading" />
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Name"
                  v-model="newCustomer.name"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Adress"
                  v-model="newCustomer.address"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Phone"
                  v-model="newCustomer.phone"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Email"
                  v-model="newCustomer.email"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="closeDialog()">Close</v-btn>
          <v-btn color="green darken-1" flat @click="saveNewCustomer()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.table-bg {
  padding: 32px 16px;
  background: #f5f5f5;
  border-radius: 4px;
}
.table-info {
  .v-toolbar__content {
    padding: 0 !important;
  }
}
.v-toolbar__content,
.v-toolbar__extension {
  padding: 0 !important;
}
</style>
