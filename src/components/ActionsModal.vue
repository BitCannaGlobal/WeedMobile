<template>
  <v-btn
    v-if="type === 'sendTx'"
    block
    size="x-large"
    color="#0FB786"
    @click="openDialogSendToken"
    >{{ $t("dashboard.btnSend") }}</v-btn
  >

  <v-btn
    v-if="type === 'claim'"
    height="40"
    block
    flat
    class="mt-2 white--text"
    color="#333333"
    @click="openDialogClaim"
  >
    {{ $t("dashboard.btnClaim") }}
  </v-btn>

  <v-btn
    v-if="type === 'stake'"
    height="40"
    block
    flat
    class="mt-2 white--text"
    color="#0FB786"
    @click="openDialogStake"
  >
    {{ $t("dashboard.btnStake") }}
  </v-btn>
  <v-dialog
    v-model="dialogSendToken"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    class="bitcannaFont"
  >
    <v-card v-if="txSend === false">
      <v-form v-if="step1" ref="form" v-model="form">
        <v-toolbar dark>
          <v-btn icon dark @click="dialogSendToken = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{
            $t("dashboard.mdlSendTx.title")
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-item
            :title="$t('addressBook.info')"
            :subtitle="this.$t('dashboard.mdlSendTx.subTitle')"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-text-field
              v-model="recipient"
              :rules="addressRules"
              variant="outlined"
              color="#00b786"
              :label="this.$t('dashboard.mdlSendTx.inpRecipient')"
              class="mt-4"
              append-icon="mdi-book-open-page-variant-outline"
              @click:append="getAddressBook()"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="amount"
              :rules="amountRules"
              variant="outlined"
              color="#00b786"
              :label="this.$t('dashboard.mdlSendTx.inpAmount')"
              type="number"
              inputmode="numeric"
              pattern="[0-9\.]*$"
              class="mt-2"
              suffix="Max"
              append-inner-icon="mdi-plus-box-outline"
              @click:append-inner="getMax()"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-text-field
              v-model="memo"
              variant="outlined"
              counter="100"
              :rules="memoRules"
              color="#00b786"
              :label="this.$t('dashboard.mdlSendTx.inpMemo')"
              class="mt-2"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-btn
              block
              color="#0FB786"
              :disabled="!form"
              :loading="loading"
              @click="checkTx()"
              >{{ $t("dashboard.mdlSendTx.btnSend") }}</v-btn
            >
          </v-list-item>
        </v-list>
      </v-form>
      <v-form v-if="step2" ref="form">
        <v-toolbar dark>
          <v-btn icon dark @click="dialogSendToken = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>{{
            $t("dashboard.mdlSendTx.title")
          }}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-list lines="two" subheader>
          <v-list-item
            :title="$t('addressBook.info')"
            :subtitle="this.$t('dashboard.mdlSendTx.subTitle')"
          ></v-list-item>
        </v-list>

        <v-divider></v-divider>
        <v-list>
          <v-list-item>
            <v-table>
              <tbody>
                <tr>
                  <td>{{ $t("dashboard.mdlSendTx.inpRecipient") }}</td>
                  <td>{{ this.truncateString(recipient, 15) }}</td>
                </tr>
                <tr>
                  <td>{{ $t("dashboard.mdlSendTx.inpAmount") }}</td>
                  <td>{{ amount }} BCNA</td>
                </tr>
                <tr>
                  <td>{{ $t("dashboard.mdlSendTx.inpMemo") }}</td>
                  <td>{{ memo }}</td>
                </tr>
              </tbody>
            </v-table>
          </v-list-item>
          <v-list-item>
            <v-alert
              v-model="alertError"
              class="mt-4"
              variant="outlined"
              type="warning"
              border="top"
              closable
              close-label="Close Alert"
            >
              {{ $t("errors.badPassword") }}
            </v-alert>
            <v-text-field
              v-model="password"
              variant="outlined"
              color="#00b786"
              :label="this.$t('dashboard.mdlSendTx.inpPassword')"
              type="password"
              class="mt-2"
            ></v-text-field>
          </v-list-item>
          <v-list-item>
            <v-btn
              block
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="sendToken()"
              >{{ $t("dashboard.mdlSendTx.btnSend") }}</v-btn
            >
          </v-list-item>
        </v-list>
      </v-form>
    </v-card>
    <v-card
      v-else
      class="txReturn text-center grey d-flex flex-column align-center justify-top mt-10"
    >
      <v-icon
        size="100"
        color="#0FB786"
        icon="mdi-check-outline"
        class="returnIcon"
      ></v-icon>
      <v-card
        elevation="0"
        class="mt-6"
        :height="200"
        :width="350"
        color="transparent"
      >
        <!-- color="transparent" -->
        <v-card-title class="text-center">
          <span class="font-weight-black text-subtitle-1">
            {{ $t("approved.title") }}
          </span>
        </v-card-title>
        <v-card-text class="text-center">
          <span class="font-weight-black text-subtitle-1">
            {{ $t("approved.subtitle") }}
          </span>
          <v-btn
            class="mt-4"
            color="#0FB786"
            @click="dialogSendToken = false"
            block
            >{{ $t("approved.back") }}</v-btn
          >
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialogAddressBook"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    class="bitcannaFont"
  >
    <v-card>
      <v-toolbar dark>
        <v-btn icon dark @click="dialogAddressBook = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Select contact</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card
        v-for="(item, i) in allContacts"
        class="ma-4"
        :title="item.name + ' (' + item.memo + ')'"
        :subtitle="item.address"
        @click="selectContact(i)"
      >
      </v-card>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialogClaim"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    class="bitcannaFont"
  >
    <v-card v-if="txSend === false">
      <v-toolbar dark>
        <v-btn icon dark @click="dialogClaim = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{
          $t("dashboard.mdlClaimTx.title")
        }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>
      <v-card class="ma-2">
        <v-card-text>
          <v-row no-gutters>
            <v-col cols="2">
              <v-sheet>
                <v-img
                  inline
                  max-height="50"
                  max-width="50"
                  min-height="50"
                  min-width="50"
                  src="@/assets/icon-reward.png"
                ></v-img>
              </v-sheet>
            </v-col>
            <v-col class="ml-4" cols="5">
              <v-sheet>
                <span class="text-subtitle-1">
                  {{ $t("dashboard.mdlClaimTx.subTitle") }}
                </span>
                <br />
                <span class="font-weight-black text-subtitle-1">
                  {{ this.totalRewards }} BCNA
                </span>
              </v-sheet>
            </v-col>
          </v-row>
        </v-card-text>
      </v-card>
      <v-list-item>
        <v-text-field
          v-model="password"
          variant="outlined"
          color="#00b786"
          :label="$t('dashboard.mdlClaimTx.inpPassword')"
          type="password"
          class="mt-2"
        ></v-text-field>
        <v-btn
          block
          color="#0FB786"
          :disabled="loading"
          :loading="loading"
          @click="claimReward()"
        >
          {{ $t("dashboard.mdlClaimTx.btnClaim") }}</v-btn
        >
      </v-list-item>
    </v-card>
    <v-card
      v-else
      class="txReturn text-center grey d-flex flex-column align-center justify-top mt-10"
    >
      <v-icon
        size="100"
        color="#0FB786"
        icon="mdi-check-outline"
        class="returnIcon"
      ></v-icon>
      <v-card
        elevation="0"
        class="mt-6"
        :height="200"
        :width="350"
        color="transparent"
      >
        <!-- color="transparent" -->
        <v-card-title class="text-center">
          <span class="font-weight-black text-subtitle-1">
            {{ $t("approved.title") }}
          </span>
        </v-card-title>
        <v-card-text class="text-center">
          <span class="font-weight-black text-subtitle-1">
            {{ $t("approved.subtitle") }}
          </span>
          <v-btn
            class="mt-4"
            color="#0FB786"
            @click="dialogClaim = false"
            block
            >{{ $t("approved.back") }}</v-btn
          >
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>

  <v-dialog
    v-model="dialogStakeToSelect"
    fullscreen
    transition="dialog-bottom-transition"
    class="bitcannaFont"
  >
    <v-toolbar dark>
      <v-btn icon dark @click="dialogStakeToSelect = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t("dashboard.mdlStake.selectVal") }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card>
      <v-list-item
        v-for="n in validators"
        :key="n.operatorAddress"
        :title="n.description.moniker"
        :subtitle="n.description.website"
        class="ma-2"
        @click="
          selectValidatorToDelegate(
            n.description.moniker,
            n.operatorAddress,
            'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/bitcanna/moniker/' +
              n.operatorAddress +
              '.png',
          )
        "
      >
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-img
              :src="
                'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/bitcanna/moniker/' +
                n.operatorAddress +
                '.png'
              "
              alt=""
            ></v-img>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-card>
  </v-dialog>
  <v-dialog
    v-model="dialogUnStakeToSelect"
    fullscreen
    transition="dialog-bottom-transition"
    class="bitcannaFont"
  >
    <v-toolbar dark>
      <v-btn icon dark @click="dialogUnStakeToSelect = false">
        <v-icon>mdi-close</v-icon>
      </v-btn>
      <v-toolbar-title>{{ $t("dashboard.mdlStake.selectVal") }}</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>

    <v-card>
      <!-- {{ allDelegations }} -->
      <v-list-item
        v-for="n in allDelegationsFormated"
        :key="n.validator"
        :title="n.moniker"
        :subtitle="n.amount + ' BCNA'"
        class="ma-2" 
        @click="
          selectValidatorToUnDelegate(
            n.moniker,
            n.validator,
            n.amount,
            'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/bitcanna/moniker/' +
            n.validator +
              '.png',
          )
        "
      > 
        <template v-slot:prepend>
          <v-avatar color="grey-lighten-1">
            <v-img
              :src="
                'https://raw.githubusercontent.com/cosmostation/chainlist/main/chain/bitcanna/moniker/' +
                n.validator +
                '.png'
              "
              alt=""
            ></v-img>
          </v-avatar>
        </template>

        <template v-slot:append>
          <v-btn
            color="grey-lighten-1"
            icon="mdi-information"
            variant="text"
          ></v-btn>
        </template>
      </v-list-item>
    </v-card>
  </v-dialog>  
  <v-dialog
    v-model="dialogStake"
    fullscreen
    :scrim="false"
    transition="dialog-bottom-transition"
    class="bitcannaFont"
  >
    <v-card v-if="txSend === false">
      <v-toolbar dark>
        <v-btn icon dark @click="dialogStake = false">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>{{ $t("dashboard.mdlStake.title") }}</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-card-text>
        <v-tabs v-model="tab" color="#0FB786" align-tabs="center">
          <v-tab :value="1">Delegate</v-tab>
          <v-tab :value="2">Undel</v-tab>
          <v-tab :value="3">Redel</v-tab>
        </v-tabs>
        <v-window v-model="tab">
          <v-window-item :key="1" :value="1">
            <v-form v-model="formDelegate" ref="formDelegate">
              <v-container>
                <v-row>
                  <v-col cols="12">

                    <v-sheet 
                      class="cardover px-3 mb-2 rounded-lg"
                      border
                    >
                      <div class="text-left mt-4">{{ $t("dashboard.mdlStake.amountDelegate") }}</div>
                      <v-text-field
                        v-model="delegateAmount"
                        variant="plain"
                        suffix="BCNA"
                        :rules="amountRulesDelegate"
                      ></v-text-field>
                      <div class="mb-4 text-right">
                        <v-chip class="mr-3" label small @click="getHalf">
                          {{ $t("dashboard.mdlStake.half") }}
                        </v-chip>
                        <v-chip label small @click="getMax"> {{ $t("dashboard.mdlStake.max") }} </v-chip>
                      </div>
                    </v-sheet>
                    <v-col
                      align-center
                      class="text-center"
                    >
                      <v-icon size="40"> mdi-arrow-down-bold </v-icon>
                    </v-col>
                    <v-sheet class="cardover px-3 mb-2 mt-4 rounded-lg" border @click="dialogStakeToSelect = true">
                      <v-card
                        class="mx-auto text-left"
                        max-width="344"
                        :title="this.validatorSelected.name"
                        elevation="0"
                        :subtitle="this.validatorSelected.address"
                        :prepend-avatar="this.validatorSelected.img"                        
                      >
                      </v-card>
                      <v-col
                        v-if="Object.keys(this.validatorSelected).length === 0"
                        cols="auto"
                      >
                        <div class="text-center">
                          {{ $t("dashboard.mdlStake.selectVal") }}
                        </div>
                      </v-col>
                    </v-sheet>

                    <v-text-field
                      v-if="Object.keys(this.validatorSelected).length !== 0"
                      v-model="password"
                      variant="outlined"
                      color="#00b786"
                      required
                      :rules="passwordRules"
                      :label="this.$t('dashboard.mdlSendTx.inpPassword')"
                      type="password"
                      class="mt-4"
                    ></v-text-field>
                    <v-sheet class="mt-4 mb-6 rounded-lg">
                      <v-btn
                        v-if="Object.keys(this.validatorSelected).length !== 0"
                        bottom
                        block
                        min-height="60"
                        class="rounded-lg"
                        color="#0FB786"
                        :disabled="!formDelegate"
                        :loading="loading"
                        @click="delegateNow()"
                      >
                        {{ $t("dashboard.mdlStake.delNow") }}
                      </v-btn>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-window-item>
          <v-window-item :key="2" :value="2">
            <v-form v-model="formUndel" ref="formUndel">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-sheet class="cardover px-3 mb-2 mt-4 rounded-lg" border @click="dialogUnStakeToSelect = true">
                      <v-card
                        class="mx-auto text-left"
                        max-width="344"
                        :title="this.validatorUndelSelected.name"
                        elevation="0"
                        :subtitle="this.validatorUndelSelected.address"
                        :prepend-avatar="this.validatorUndelSelected.img"
                      >
                      </v-card>
                      <v-col
                        v-if="Object.keys(this.validatorUndelSelected).length === 0"
                        cols="auto"
                      >
                        <div class="text-center">
                          {{ $t("dashboard.mdlStake.selectVal") }}
                        </div>
                      </v-col>
                    </v-sheet>
                    <v-col
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      align-center
                      class="text-center"
                    >
                      <v-icon size="40"> mdi-arrow-down-bold </v-icon>
                    </v-col>

                    <v-sheet
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      class="cardover px-3 mb-2 rounded-lg"
                      border
                    >
                      <div class="text-left mt-4">{{ $t("dashboard.mdlStake.titleUndel") }}</div>
                      <v-text-field
                        v-model="unDelegateAmount"
                        variant="plain"
                        suffix="BCNA"
                        :rules="amountRulesUnDelegate"
                      ></v-text-field>
                      <div class="mb-4 text-right">
                        <v-chip class="mr-3" label small @click="getUndelHalf(this.validatorUndelSelected.amount)">
                          {{ $t("dashboard.mdlStake.half") }}
                        </v-chip>
                        <v-chip label small @click="getUndelMax(this.validatorUndelSelected.amount)"> {{ $t("dashboard.mdlStake.max") }} </v-chip>
                      </div>
                    </v-sheet>
                    <v-text-field
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      v-model="password"
                      variant="outlined"
                      color="#00b786"
                      required
                      :rules="passwordRules"
                      :label="this.$t('dashboard.mdlSendTx.inpPassword')"
                      type="password"
                      class="mt-4"
                    ></v-text-field>
                    <v-sheet class="mt-4 mb-6 rounded-lg">
                      <v-btn
                        v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                        bottom
                        block
                        min-height="60"
                        class="rounded-lg"
                        color="#0FB786"
                        :disabled="!formUndel"
                        :loading="loading"
                        @click="unDelegateNow()"
                      >
                        {{ $t("dashboard.mdlStake.undelNow") }}
                      </v-btn>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>          
          </v-window-item>
          <v-window-item :key="3" :value="3">
            <v-form v-model="formRedel" ref="formRedel">
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-sheet class="cardover px-3 mb-2 mt-4 rounded-lg" border @click="dialogUnStakeToSelect = true">
                      <v-card
                        class="mx-auto text-left"
                        max-width="344"
                        :title="this.validatorUndelSelected.name"
                        elevation="0"
                        :subtitle="this.validatorUndelSelected.address"
                        :prepend-avatar="this.validatorUndelSelected.img"
                      >
                      </v-card>
                      <v-col
                        v-if="Object.keys(this.validatorUndelSelected).length === 0"
                        cols="auto"
                      >
                        <div class="text-center">
                            {{ $t("dashboard.mdlStake.selectVal") }}
                        </div>
                      </v-col>
                    </v-sheet>
                    <v-col
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      align-center
                      class="text-center"
                    >
                      <v-icon size="40"> mdi-arrow-down-bold </v-icon>
                    </v-col>

                    <v-sheet
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      class="cardover px-3 mb-2 rounded-lg"
                      border
                    >
                      <div class="text-left mt-4">{{ $t("dashboard.mdlStake.titleRedel") }}</div>
                      <v-text-field
                        v-model="reDelegateAmount"
                        variant="plain"
                        suffix="BCNA"
                        :rules="amountRulesReDelegate"
                      ></v-text-field>
                      <div class="mb-4 text-right">
                        <v-chip class="mr-3" label small @click="getRedelHalf(this.validatorUndelSelected.amount)">
                          Half
                        </v-chip>
                        <v-chip label small @click="getRedelMax(this.validatorUndelSelected.amount)"> Max </v-chip>
                      </div>
                    </v-sheet>
                    <v-col
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      align-center
                      class="text-center"
                    >
                      <v-icon size="40"> mdi-arrow-down-bold </v-icon>
                    </v-col>
                    <v-sheet 
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      class="cardover px-3 mb-2 mt-4 rounded-lg" border @click="dialogStakeToSelect = true"
                    >
                      <v-card
                        class="mx-auto text-left"
                        max-width="344"
                        :title="this.validatorSelected.name"
                        elevation="0"
                        :subtitle="this.validatorSelected.address"
                        :prepend-avatar="this.validatorSelected.img"                        
                      >
                      </v-card>
                      <v-col
                        v-if="Object.keys(this.validatorSelected).length === 0"
                        cols="auto"
                      >
                        <div class="text-center">
                          {{ $t("dashboard.mdlStake.selectVal") }}
                        </div>
                      </v-col>
                    </v-sheet>
                    
                    <v-text-field
                      v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                      v-model="password"
                      variant="outlined"
                      color="#00b786"
                      required
                      :rules="passwordRules"
                      :label="this.$t('dashboard.mdlSendTx.inpPassword')"
                      type="password"
                      class="mt-4"
                    ></v-text-field>
                    <v-sheet class="mt-4 mb-6 rounded-lg">
                      <v-btn
                        v-if="Object.keys(this.validatorUndelSelected).length !== 0"
                        bottom
                        block
                        min-height="60"
                        class="rounded-lg"
                        color="#0FB786"
                        :disabled="!formRedel"
                        :loading="loading"
                        @click="reDelegateNow()"
                      >
                        
                        {{ $t("dashboard.mdlStake.redelNow") }}
                      </v-btn>
                    </v-sheet>
                  </v-col>
                </v-row>
              </v-container>
            </v-form>              
          </v-window-item>
        </v-window>
      </v-card-text>

      <v-list-item>
        <!-- <v-text-field
                v-model="password"
                variant="outlined"
                color="#00b786" 
                label="Password" 
                type="password"
                class="mt-2"
              ></v-text-field>
              <v-btn 
              block 
              color="#0FB786"
              :disabled="loading"
              :loading="loading"
              @click="claimReward()
            ">Claim</v-btn>   -->
      </v-list-item>
    </v-card>
    <v-card
      v-else
      class="txReturn text-center grey d-flex flex-column align-center justify-top mt-10"
    >
      <v-icon
        size="100"
        color="#0FB786"
        icon="mdi-check-outline"
        class="returnIcon"
      ></v-icon>
      <v-card
        elevation="0"
        class="mt-6"
        :height="200"
        :width="350"
        color="transparent"
      >
        <!-- color="transparent" -->
        <v-card-title class="text-center">
          <span class="font-weight-black text-subtitle-1">
            {{ $t("approved.title") }}
          </span>
        </v-card-title>
        <v-card-text class="text-center">
          <span class="font-weight-black text-subtitle-1">
            {{ $t("approved.subtitle") }}
          </span>
          <v-btn
            class="mt-4"
            color="#0FB786"
            @click="dialogStake = false"
            block
            >{{ $t("approved.back") }}</v-btn
          >
        </v-card-text>
      </v-card>
    </v-card>
  </v-dialog>
</template>
<script>
import { mapState } from "vuex";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import {
  assertIsDeliverTxSuccess,
  SigningStargateClient,
  GasPrice,
  defaultRegistryTypes,
} from "@cosmjs/stargate";
import { Preferences } from "@capacitor/preferences";
import { getAllContact } from "@/libs/storage.js";
import bitcannaConfig from "../bitcanna.config";
import md5 from "md5";
import bech32 from "bech32";
import { ca } from "translatte/languages";

function bech32Validation(address) {
  try {
    bech32.decode(address);
    return true;
  } catch (error) {
    return false;
  }
}

function countPlaces(num) {
  const sep = String(23.32).match(/\D/)[0];
  const b = String(num).split(sep);
  return b[1] ? b[1].length : 0;
}

export default {
  name: "ActionsModal",
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: false,
      formDelegate: false,
      formUndel: false,
      formRedel: false,
      bitcannaConfig: bitcannaConfig,
      dialogSendToken: false,
      dialogAddressBook: false,
      dialogClaim: false,
      dialogStake: false,
      dialogStakeToSelect: false,
      dialogUnStakeToSelect: false,
      alertError: false,
      actionSend: false,
      actionReceive: false,
      recipient: "",
      amount: "",
      memo: "",
      password: "",
      txSend: false,
      accountNow: "",
      loading: false,
      tab: null,
      validatorSelected: {},
      validatorUndelSelected: {},
      delegateAmount: 0,
      unDelegateAmount: 0,
      reDelegateAmount: 0,
      allContacts: [],
      amountRulesDelegate: [
        (v) => !!v || this.$t("dashboard.mdlSendTx.errorAmountRequire"),
        (v) => !isNaN(v) || this.$t("dashboard.mdlSendTx.errorAmountNumber"),
        (v) =>
          v <= this.spendableBalances ||
          "You don't have enough tokens (" + this.spendableBalances + ")",
        (v) =>
          countPlaces(v) < 7 ||
          this.$t("dashboard.mdlSendTx.errorAmountDecimal"),
      ],
      amountRulesUnDelegate: [
        (v) => !!v || this.$t("dashboard.mdlSendTx.errorAmountRequire"),
        (v) => !isNaN(v) || this.$t("dashboard.mdlSendTx.errorAmountNumber"),
        (v) =>
          v >= this.validatorUndelSelected.amount ||
          "You don't have enough tokens (" + this.validatorUndelSelected.amount + ")",
        (v) =>
          countPlaces(v) < 7 ||
          this.$t("dashboard.mdlSendTx.errorAmountDecimal"),
      ],
      amountRulesReDelegate: [
        (v) => !!v || this.$t("dashboard.mdlSendTx.errorAmountRequire"),
        (v) => !isNaN(v) || this.$t("dashboard.mdlSendTx.errorAmountNumber"),
        (v) =>
          v >= this.validatorUndelSelected.amount ||
          "You don't have enough tokens (" + this.validatorUndelSelected.amount + ")",
        (v) =>
          countPlaces(v) < 7 ||
          this.$t("dashboard.mdlSendTx.errorAmountDecimal"),
      ],
      addressRules: [
        (v) => !!v || this.$t("dashboard.mdlSendTx.errorAddrRequire"),
        (v) =>
          v.startsWith("bcna") || this.$t("dashboard.mdlSendTx.errorPrefix"),
        (v) =>
          bech32Validation(v) || this.$t("dashboard.mdlSendTx.errorBech32"),
      ],
      memoRules: [
        (v) => v.length <= 100 || this.$t("dashboard.mdlSendTx.errorMemo"),
      ],
      passwordRules: [(v) => !!v || "Password is required"],
      step1: true,
      step2: false,
      step3: false,
    };
  },
  computed: {
    ...mapState([
      "allWallets",
      "spendableBalances",
      "accountSelected",
      "network",
      "totalRewards",
      "allDelegations",
      "allDelegationsFormated",
      "validators",
    ]),
  },
  async mounted() {
    let getAllContacts = await getAllContact();
    this.allContacts = JSON.parse(getAllContacts);

    console.log(this.allDelegations);
 
  },
  methods: {
    checkTx() {
      this.step1 = false;
      this.step2 = true;
    },
    selectContact(index) {
      this.recipient = this.allContacts[index].address;
      this.memo = this.allContacts[index].memo;
      this.dialogAddressBook = false;
    },
    getAddressBook() {
      this.dialogAddressBook = true;
    },
    getMax() {
      this.amount = this.spendableBalances;
      this.delegateAmount = this.spendableBalances;
    },
    getHalf() {
      this.amount = (this.spendableBalances / 2).toFixed(6);
      this.delegateAmount = (this.spendableBalances / 2).toFixed(6);
    },
    getUndelMax(amount) {
      this.unDelegateAmount = amount;
    },
    getUndelHalf(amount) {
      this.unDelegateAmount = (amount / 2).toFixed(6);
    },
    getRedelMax(amount) {
      this.reDelegateAmount = amount;
    },
    getRedelHalf(amount) {
      this.reDelegateAmount = (amount / 2).toFixed(6);
    },
    setAddress(address) {
      this.recipient = address;
    },
    openDialogStake() {
      this.dialogStake = true;
      this.txSend = false;
      this.loading = false;
      this.delegateAmount = 0;
      this.validatorSelected = {};
      this.unDelegateAmount = 0;
      this.reDelegateAmount = 0;
      this.validatorUndelSelected = {};
      this.password = "";
    },
    openDialogClaim() {
      this.dialogClaim = true;
      this.txSend = false;
      this.password = "";
      this.loading = false;
    },
    openDialogSendToken() {
      this.dialogSendToken = true;
      this.txSend = false;
      this.recipient = "";
      this.amount = "";
      this.memo = "";
      this.password = "";
      this.loading = false;
      this.step1 = true;
      this.step2 = false;
    },
    closeModal() {
      this.actionSend = false;
      this.actionReceive = false;
    },
    selectValidatorToDelegate(name, address, img) {
      this.validatorSelected = { name: name, address: address, img: img };
      this.dialogStakeToSelect = false;
    },
    selectValidatorToUnDelegate(name, address, amount, img) {
      this.validatorUndelSelected = { name: name, address: address, amount: amount, img: img };
      this.dialogUnStakeToSelect = false;
    },
    async sendToken() {
      const { valid } = await this.$refs.form.validate();
      if (!valid) {
        return;
      }

      const hash = md5(this.password);
      const { value } = await Preferences.get({ key: "masterPass" });

      if (hash !== value) {
        this.alertError = true;
        return;
      }

      this.loading = true;

      const deserialized = await DirectSecp256k1HdWallet.deserialize(
        this.allWallets[this.accountSelected].data,
        this.password,
      );

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        deserialized.secret.data,
        {
          prefix: "bcna",
        },
      );
      const [accounts] = await wallet.getAccounts();

      const client = await SigningStargateClient.connectWithSigner(
        this.bitcannaConfig[this.network].rpcURL,
        wallet,
        {
          gasPrice: GasPrice.fromString(
            this.bitcannaConfig[this.network].gasPrice +
              this.bitcannaConfig[this.network].coinLookup.chainDenom,
          ),
        },
      );

      const convertAmount = Math.round(this.amount * 1000000);
      const amount = {
        denom: this.bitcannaConfig[this.network].coinLookup.chainDenom,
        amount: convertAmount.toString(),
      };

      try {
        const result = await client.sendTokens(
          accounts.address,
          this.recipient,
          [amount],
          "auto",
          this.memo,
        );
        assertIsDeliverTxSuccess(result);
        console.log(result);
        this.txSend = true;

        this.accountNow = this.allWallets[this.accountSelected];
        await this.$store.dispatch("getBankModule", this.accountNow.address);
        await this.$store.dispatch("getDistribModule", this.accountNow.address);
        await this.$store.dispatch("getStakingModule", this.accountNow.address);
        await this.$store.dispatch("getWalletAmount");
      } catch (error) {
        console.error(error);
      }
    },
    async claimReward() {
      //this.dialogClaim = false
      /* const hash = md5(this.password); 
      const { value } = await Preferences.get({ key: 'masterPass' });

      if(hash !== value) {
        this.alertError = true
        return
      } */

      this.loading = true;

      const deserialized = await DirectSecp256k1HdWallet.deserialize(
        this.allWallets[this.accountSelected].data,
        this.password,
      );

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        deserialized.secret.data,
        {
          prefix: "bcna",
        },
      );
      const [accounts] = await wallet.getAccounts();

      const client = await SigningStargateClient.connectWithSigner(
        this.bitcannaConfig[this.network].rpcURL,
        wallet,
        {
          gasPrice: GasPrice.fromString(
            this.bitcannaConfig[this.network].gasPrice +
              this.bitcannaConfig[this.network].coinLookup.chainDenom,
          ),
        },
      );

      const foundMsgType = defaultRegistryTypes.find(
        (element) =>
          element[0] ===
          "/cosmos.distribution.v1beta1.MsgWithdrawDelegatorReward",
      );
      //console.log(this.allDelegations)

      const copieDelegator = [];
      this.allDelegations.forEach(function (item) {
        console.log(item);
        copieDelegator.push({
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            delegatorAddress: item.delegation.delegatorAddress,
            validatorAddress: item.delegation.validatorAddress,
          }),
        });
      });
      console.log(accounts);

      try {
        const result = await client.signAndBroadcast(
          accounts.address,
          copieDelegator,
          "auto",
          "",
        );
        assertIsDeliverTxSuccess(result);
        this.txSend = true;
        this.accountNow = this.allWallets[this.accountSelected]
        await this.$store.dispatch("getBankModule", this.accountNow.address);
        await this.$store.dispatch("getDistribModule", this.accountNow.address);
        await this.$store.dispatch("getStakingModule", this.accountNow.address);
        await this.$store.dispatch("getWalletAmount");
      } catch (error) {
        console.error(error);
      }
    },
    async delegateNow() {
      const { valid } = await this.$refs.formDelegate.validate();
      console.log(valid);
      if (!valid) {
        return;
      }

      const hash = md5(this.password);
      const { value } = await Preferences.get({ key: "masterPass" });

      if (hash !== value) {
        this.alertError = true;
        return;
      }

      this.loading = true;

      const deserialized = await DirectSecp256k1HdWallet.deserialize(
        this.allWallets[this.accountSelected].data,
        this.password,
      );

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        deserialized.secret.data,
        {
          prefix: "bcna",
        },
      );
      const [accounts] = await wallet.getAccounts();
      console.log(accounts);

      const client = await SigningStargateClient.connectWithSigner(
        this.bitcannaConfig[this.network].rpcURL,
        wallet,
        {
          gasPrice: GasPrice.fromString(
            this.bitcannaConfig[this.network].gasPrice +
              this.bitcannaConfig[this.network].coinLookup.chainDenom,
          ),
        },
      );

      const foundMsgType = defaultRegistryTypes.find(
        (element) => element[0] === "/cosmos.staking.v1beta1.MsgDelegate",
      );
      //const amount = coins(this.delegateAmount * 1000000, cosmosConfig[this.store.chainSelected].coinLookup.chainDenom);

      const finalAmount = {
        denom: this.bitcannaConfig[this.network].coinLookup.chainDenom,
        amount: (this.delegateAmount * 1000000).toString(),
      };
      const finalMsg = {
        typeUrl: foundMsgType[0],
        value: foundMsgType[1].fromPartial({
          delegatorAddress: accounts.address,
          validatorAddress: this.validatorSelected.address,
          amount: finalAmount,
        }),
      };
      console.log("delegateTx", finalMsg);

      try {
        const result = await client.signAndBroadcast(
          accounts.address,
          [finalMsg],
          "auto",
          "",
        );
        assertIsDeliverTxSuccess(result);

        this.accountNow = this.allWallets[this.accountSelected]
        await this.$store.dispatch('getBankModule', this.accountNow.address)
        await this.$store.dispatch('getDistribModule', this.accountNow.address)
        await this.$store.dispatch('getStakingModule', this.accountNow.address)
        await this.$store.dispatch('getWalletAmount')


        this.txSend = true;
      } catch (error) {
        console.error(error);
      }
    },
    async unDelegateNow() {
      const { valid } = await this.$refs.formDelegate.validate(); 
      if (!valid) {
        return;
      }

      const hash = md5(this.password);
      const { value } = await Preferences.get({ key: "masterPass" });

      if (hash !== value) {
        this.alertError = true;
        return;
      }

      this.loading = true;

      const deserialized = await DirectSecp256k1HdWallet.deserialize(
        this.allWallets[this.accountSelected].data,
        this.password,
      );

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        deserialized.secret.data,
        {
          prefix: "bcna",
        },
      );
      const [accounts] = await wallet.getAccounts();
      console.log(accounts);

      const client = await SigningStargateClient.connectWithSigner(
        this.bitcannaConfig[this.network].rpcURL,
        wallet,
        {
          gasPrice: GasPrice.fromString(
            this.bitcannaConfig[this.network].gasPrice +
              this.bitcannaConfig[this.network].coinLookup.chainDenom,
          ),
        },
      );

      const foundMsgType = defaultRegistryTypes.find(
        (element) => element[0] === "/cosmos.staking.v1beta1.MsgUndelegate"
      );

        const convertAmount = (this.unDelegateAmount * 1000000).toFixed(0);
        const amount = {
          denom: this.bitcannaConfig[this.network].coinLookup.chainDenom,
          amount: convertAmount.toString(),
        };
        
        const finalMsg = {
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            delegatorAddress: accounts.address,
            validatorAddress: this.validatorUndelSelected.address,
            amount: amount,
          }),
        };
        console.log(finalMsg)
      try {
        const result = await client.signAndBroadcast(
          accounts.address,
          [finalMsg],
          "auto",
          "",
        );
        assertIsDeliverTxSuccess(result);
        console.log(result);

        this.accountNow = this.allWallets[this.accountSelected];
        await this.$store.dispatch('getBankModule', this.accountNow.address)
        await this.$store.dispatch('getDistribModule', this.accountNow.address)
        await this.$store.dispatch('getStakingModule', this.accountNow.address)
        await this.$store.dispatch('getWalletAmount')


        this.txSend = true;
      } catch (error) {
        console.error(error);
      }
    },
    async reDelegateNow() {
      const { valid } = await this.$refs.formRedel.validate(); 
      if (!valid) {
        return;
      }
      console.log('reDelegateNow')
      console.log(this.reDelegateAmount)
      console.log(this.validatorUndelSelected.address)
      console.log(this.validatorSelected.address)

      const hash = md5(this.password);
      const { value } = await Preferences.get({ key: "masterPass" });

      if (hash !== value) {
        this.alertError = true;
        return;
      }

      this.loading = true;

      const deserialized = await DirectSecp256k1HdWallet.deserialize(
        this.allWallets[this.accountSelected].data,
        this.password,
      );

      const wallet = await DirectSecp256k1HdWallet.fromMnemonic(
        deserialized.secret.data,
        {
          prefix: "bcna",
        },
      );
      const [accounts] = await wallet.getAccounts();
      console.log(accounts);

      const client = await SigningStargateClient.connectWithSigner(
        this.bitcannaConfig[this.network].rpcURL,
        wallet,
        {
          gasPrice: GasPrice.fromString(
            this.bitcannaConfig[this.network].gasPrice +
              this.bitcannaConfig[this.network].coinLookup.chainDenom,
          ),
        },
      );

      const foundMsgType = defaultRegistryTypes.find(
          (element) =>
            element[0] === "/cosmos.staking.v1beta1.MsgBeginRedelegate"
        );

        const convertAmount = Math.round(this.reDelegateAmount * 1000000);
        const amount = {
          denom: this.bitcannaConfig[this.network].coinLookup.chainDenom,
          amount: convertAmount.toString(),
        };
        const finalMsg = {
          typeUrl: foundMsgType[0],
          value: foundMsgType[1].fromPartial({
            delegatorAddress: accounts.address,
            validatorSrcAddress: this.validatorUndelSelected.address,
            validatorDstAddress: this.validatorSelected.address,
            amount: amount,
          }),
        };

        console.log(finalMsg)
        try {
        const result = await client.signAndBroadcast(
          accounts.address,
          [finalMsg],
          "auto",
          "",
        );
        assertIsDeliverTxSuccess(result);
        console.log(result);

        this.accountNow = this.allWallets[this.accountSelected];
        await this.$store.dispatch('getBankModule', this.accountNow.address)
        await this.$store.dispatch('getDistribModule', this.accountNow.address)
        await this.$store.dispatch('getStakingModule', this.accountNow.address)
        await this.$store.dispatch('getWalletAmount')


        this.txSend = true;
      } catch (error) {
        this.loading = false;
        console.error(error);
      } 
    },
    truncateString(str, num) {
      if (str.length <= num) {
        return str;
      }
      return str.slice(0, num) + "...";
    },
  },
};
</script>

<style>
.txReturn {
  background: linear-gradient(180deg, #000000, 80%, #0fb786);
}
.returnIcon {
  margin-top: 200px;
}
</style>
