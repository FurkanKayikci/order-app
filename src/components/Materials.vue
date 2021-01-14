<script>
import { mapActions, mapMutations, mapState } from "vuex";
import Loader from "./Loader";

export default {
  components: {
    Loader,
  },
  data() {
    return {
      materialDialog: false,
      materialListIsLoading: true,
      tempArray: [],
      newMaterial: {
        id: "",
        sku: "",
        name: "",
        brand: "",
        description: "",
        price: "",
        vatRate: "",
        image: "",
      },
      materialHeaders: [
        {
          text: "Image",
          sortable: false,
          value: "image",
        },
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
      materialDatas: [],
    };
  },
  methods: {
    ...mapActions(["fetchTableDatas", "getStateLength", "pushTableDatas"]),
    ...mapMutations(["setMaterials", "addState"]),
    ...mapState(["materials"]),

    saveNewMaterial() {
      this.materialListIsLoading = true;
      this.getStateLength("materials").then((response) => {
        this.newMaterial.id = response;
        const params = { dataType: "materials", newData: this.newMaterial };
        this.pushTableDatas(params)
          .then(({ data }) => {
            this.newMaterial.keyId = data.name;
            this.addState(params);
            this.closeDialog();
          })
          .catch(() => {})
          .finally(() => {
            this.materialListIsLoading = false;
          });
      });
    },

    closeDialog() {
      this.newMaterial = {
        id: "",
        name: "",
        adress: "",
        phone: "",
        email: "",
      };
      this.materialDialog = false;
    },
  },
  mounted() {
    this.fetchTableDatas("materials")
      .then(({ data }) => {
        const tempArray = [];
        for (let key in data) {
          tempArray.push({ ...data[key], keyId: key });
        }
        this.materialDatas = tempArray;
        this.setMaterials(tempArray);
      })
      .catch(() => {
        console.log("Error fetching material list!");
        this.materialDatas = [
          {
            id: 1,
            sku: "0",
            name: "Hatalı Veri",
            brand: "Hatalı Veri",
            description: "Hatalı Veri",
            price: 0.0,
            vatRate: 0,
            image: "",
          },
        ];
      })
      .finally(() => {
        this.materialListIsLoading = false;
      });
  },
};
</script>

<template>
  <div class="materials-component">
    <v-toolbar flat color="white" class="table-info">
      <v-toolbar-title>Materials Table</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        small
        color="green"
        class="white--text"
        @click="materialDialog = true"
      >
        <v-icon left dark>add</v-icon>
        Add Material
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="materialHeaders"
      :items="materialDatas"
      :items-per-page="15"
      class="elevation-0 table-bg"
      style="min-height:375px !important;"
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
    <Loader v-if="materialListIsLoading" />
    <v-dialog v-model="materialDialog" persistent max-width="960px">
      <v-card>
        <v-card-title>
          <span class="headline">Add New Material</span>
        </v-card-title>

        <v-card-text style="position:relative;">
          <Loader v-if="materialListIsLoading" />
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="SKU"
                  v-model="newMaterial.sku"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Name"
                  v-model="newMaterial.name"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Brand"
                  v-model="newMaterial.brand"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Description"
                  v-model="newMaterial.description"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Image"
                  v-model="newMaterial.image"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Price"
                  v-model="newMaterial.price"
                  required
                ></v-text-field>
              </v-flex>

              <v-flex xs12 sm6 md6>
                <v-text-field
                  label="Description"
                  v-model="newMaterial.vatkey"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red darken-1" flat @click="closeDialog()">Close</v-btn>
          <v-btn color="green darken-1" flat @click="saveNewMaterial()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<style lang="scss" scoped>
.materials-component {
  position: relative;
}
.table-bg {
  padding: 32px 16px;
  background: #f5f5f5;
  border-radius: 4px;
}
.table-info {
  .v-toolbar__content {
    padding: 8px !important;
  }
}
</style>
