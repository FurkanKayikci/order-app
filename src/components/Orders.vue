<script>
import { mapActions, mapMutations } from "vuex";
import Loader from "./Loader";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      orderDialog: false,
      orderListIsLoading: true,
      editingOrder: {
        id: "",
        docTypeName: "",
        docNumber: "",
        customerName: "",
        totalPrice: "",
        totalGrossPrice: "",
        shippingCost: "",
        isPaid: "",
        materials: [],
      },
      tempArray: [],
      orderHeaders: [
        { text: "DocType", align: "left", value: "docTypeName" },
        { text: "DocNumber", align: "left", value: "docNumber" },
        { text: "Customer", align: "left", value: "customerName" },
        { text: "Total Price", align: "right", value: "totalPrice" },
        { text: "Total Gross Price", align: "right", value: "totalGrossPrice" },
        { text: "Shipping Cost", align: "right", value: "shippingCost" },
        { text: "Is Paid?", align: "center", value: "isPaid" },
        { text: "Edit & Detail", align: "center", value: "details" },
      ],
      orderDatas: [],
      orderMaterialsHeader: [
        { text: "Image", sortable: false, value: "image" },
        { text: "SKU", value: "sku", align: "left" },
        { text: "Name", value: "name", align: "left" },
        { text: "Brand", value: "brand", align: "left", sortable: false },
        {
          text: "Description",
          value: "description",
          align: "left",
          width: "400px",
        },
        { text: "Price", value: "price", align: "left", sortable: false },
        { text: "VatKey", value: "vatkey", align: "left", sortable: false },
      ],
      orderMaterialsDatas: [],
    };
  },

  methods: {
    ...mapActions(["fetchTableDatas", "editTableDatas", "getStateLength"]),
    ...mapMutations(["setOrders"]),

    saveEditingOrder() {
      this.orderListIsLoading = true;
      const params = { dataType: "orders", newData: this.editingOrder };
      this.editTableDatas(params)
        .then(({ data }) => {
          this.editingOrder.keyId = data.keyId;
          this.closeDialog();
        })
        .catch(() => {})
        .finally(() => {
          this.orderListIsLoading = false;
        });
    },

    editOrder(item) {
      this.orderListIsLoading = true;
      this.orderDialog = true;
      this.editingOrder = item;
      this.fetchTableDatas("orders")
        .then(({ data }) => {
          const tempMaterials = [];
          for (let key in data) {
            tempMaterials.push({ ...data[key], keyId: key });
          }
          this.editingOrder.materials = tempMaterials[0].materials;
          this.orderMaterialsDatas = this.editingOrder.materials;
        })
        .catch(() => {
          console.log("Error fetching order list!");
          this.editingOrder.materials = [];
        })
        .finally(() => {
          this.orderListIsLoading = false;
        });
    },

    closeDialog() {
      this.editingOrder = {
        id: "",
        docTypeName: "",
        docNumber: "",
        customerName: "",
        totalPrice: "",
        totalGrossPrice: "",
        shippingCost: "",
        isPaid: "",
        materials: [
          {
            id: 0,
            sku: "1232131",
            name: "Hatalı Veri",
            brand: "Hatalı Veri",
            description: "Hatalı Veri",
            price: 0.0,
            vatRate: 0,
            image: "",
          },
        ],
      };
      this.orderDialog = false;
    },
  },
  mounted() {
    this.fetchTableDatas("orders")
      .then(({ data }) => {
        const tempArray = [];
        for (let key in data) {
          tempArray.push({ ...data[key], keyId: key });
        }
        this.orderDatas = tempArray;
        this.setOrders(tempArray);
      })
      .catch(() => {
        console.log("Error fetching order list!");
        this.orderDatas = [
          {
            id: 1,
            docTypeName: "Hatalı Veri",
            docNumber: "Hatalı Veri",
            customerName: "Hatalı Veri",
            totalPrice: "Hatalı Veri",
            totalGrossPrice: "Hatalı Veri",
            shippingCost: "Hatalı Veri",
            isPaid: "Hatalı Veri",
            isDelete: "Hatalı Veri0",
          },
        ];
        this.setOrders(this.orderDatas);
      })
      .finally(() => {
        this.orderListIsLoading = false;
      });
  },
};
</script>

<template>
  <div class="orders-component">
    <v-toolbar flat color="white" class="table-info">
      <v-toolbar-title>Orders Table</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-data-table
      :headers="orderHeaders"
      :items="orderDatas"
      :items-per-page="15"
      class="elevation-0 table-bg"
    >
      <template v-slot:items="props">
        <td class="text-xs-left">{{ props.item.docTypeName }}</td>
        <td class="text-xs-left">{{ props.item.docNumber }}</td>
        <td class="text-xs-left">{{ props.item.customerName }}</td>
        <td class="text-xs-right">{{ props.item.totalPrice }}</td>
        <td class="text-xs-right">{{ props.item.totalGrossPrice }}</td>
        <td class="text-xs-right">{{ props.item.shippingCost }}</td>
        <td class="text-xs-center">
          <v-icon :color="props.item.isPaid ? 'green' : 'grey'">check</v-icon>
        </td>
        <td class="text-xs-center">
          <v-flex>
            <v-btn
              flat
              small
              icon
              color="orange"
              @click="editOrder(props.item)"
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
    <Loader v-if="orderListIsLoading" />
    <v-dialog v-model="orderDialog" persistent max-width="90%">
      <v-card>
        <v-card-title>
          <span class="headline"
            >{{ editingOrder.docNumber }} | {{ editingOrder.docTypeName }}</span
          >
        </v-card-title>
        <v-card-text>
          <Loader v-if="orderListIsLoading" />
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="SKU"
                  v-model="editingOrder.docNumber"
                  required
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="SKU"
                  v-model="editingOrder.docTypeName"
                  required
                  disabled
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Name"
                  v-model="editingOrder.customerName"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Brand"
                  v-model="editingOrder.totalPrice"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Description"
                  v-model="editingOrder.shippingCost"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-switch
                  v-model="editingOrder.isPaid"
                  label="IsPaid"
                  color="green"
                  required
                ></v-switch>
              </v-flex>
            </v-layout>
          </v-container>

          <v-container>
            <v-layout>
              <v-flex>
                <h3>Sales Items</h3>
                <v-data-table
                  :headers="orderMaterialsHeader"
                  :items="orderMaterialsDatas"
                  :items-per-page="5"
                  class="elevation-0 table-bg"
                >
                  <template v-slot:items="props">
                    <td class="text-xs-center">
                      <v-img
                        :src="props.item.image"
                        aspect-ratio="1"
                        contain
                        width="48px"
                        heigth="48px"
                      ></v-img>
                    </td>
                    <td class="text-xs-left">{{ props.item.sku }}</td>
                    <td class="text-xs-left">{{ props.item.name }}</td>
                    <td class="text-xs-left">{{ props.item.brand }}</td>
                    <td class="text-xs-left">{{ props.item.description }}</td>
                    <td class="text-xs-left">{{ props.item.price }}</td>
                    <td class="text-xs-left">{{ props.item.vatkey }}</td>
                  </template>
                </v-data-table>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="closeDialog()">Close</v-btn>
          <v-btn color="green darken-1" flat @click="saveEditingOrder()"
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
.table-info >>> .v-toolbar__content {
  padding: 0px !important;
}
</style>
