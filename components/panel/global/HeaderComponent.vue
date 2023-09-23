<template>
  <div v-if="loginUser">
    <v-app-bar
      :clipped-left="clipped"
      app
      height="auto"
      color="#3D3D66"
    >
      <v-app-bar-nav-icon class="open-drawer" @click.stop="rightDrawer = !rightDrawer" />
      <v-container fluid>
        <div class="nav-bar">
          <div v-if="loginUser" class="user-profile-box">
            <img :src="loginUser.logo" />
            <span class="user-full-name">{{ `${loginUser.fname} ${loginUser.lname}` }}</span>
            <v-menu
              offset-y
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  color="#ffffff"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-menu-down</v-icon>
                </v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in items"
                  :key="index"
                  link
                  @click="goToPage(item.link)"
                  v-if="canShow(item)"
                >
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item>
                <v-divider />
                <v-list-item
                  @click="exit"
                >
                  <v-list-item-title>خروج</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>
          </div>
          <div class="links">
            <nuxt-link to="/organization">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.c{opacity:0.4;}</style></defs><g transform="translate(-1303 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(1303 20)"/><g transform="translate(1316.5 30)"><path class="b" d="M74.5,3.5a3.5,3.5,0,0,0-7,0A3.5,3.5,0,0,0,64,7v.875a.876.876,0,0,0,.875.875h12.25A.878.878,0,0,0,78,7.875V7A3.5,3.5,0,0,0,74.5,3.5ZM71,4.813A1.313,1.313,0,1,1,72.313,3.5,1.311,1.311,0,0,1,71,4.813Zm-5.25,15.75a1.313,1.313,0,1,0,1.313,1.313A1.313,1.313,0,0,0,65.75,20.563Zm3.757-8.055-2.882,2.882-1.131-1.132a.875.875,0,0,0-1.237,1.237l1.75,1.75a.88.88,0,0,0,.619.256.871.871,0,0,0,.619-.256l3.5-3.5a.874.874,0,1,0-1.236-1.237Z" transform="translate(-60.5)"/><path class="c" d="M18.375,64H14a3.5,3.5,0,0,1,3.5,3.5v.875a.878.878,0,0,1-.875.875H4.375a.876.876,0,0,1-.875-.875V67.5A3.5,3.5,0,0,1,7,64H2.625A2.625,2.625,0,0,0,0,66.625v19.25A2.625,2.625,0,0,0,2.625,88.5h15.75A2.625,2.625,0,0,0,21,85.875V66.625A2.625,2.625,0,0,0,18.375,64ZM5.25,83.688a1.313,1.313,0,1,1,1.313-1.312A1.313,1.313,0,0,1,5.25,83.688ZM6.125,78a.871.871,0,0,1-.619-.256l-1.75-1.75a.875.875,0,1,1,1.237-1.237l1.131,1.132,2.881-2.881a.875.875,0,0,1,1.237,1.237l-3.5,3.5A.882.882,0,0,1,6.125,78Zm10.5,5.25h-7a.875.875,0,0,1,0-1.75h7a.875.875,0,0,1,0,1.75Zm0-5.25h-5.25a.875.875,0,0,1,0-1.75h5.25a.875.875,0,0,1,0,1.75Z" transform="translate(0 -60.5)"/></g></g></svg>
              <span class="title">پذیرش</span>
              <span class="has-notification"></span>
            </nuxt-link>
            <nuxt-link
              v-if="loginUser.organization && loginUser.organization.profession_id != 1 && loginUser.organization.profession_id != 2 && loginUser.organization.profession_id != 3"
              to="/appointment"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.c{opacity:0.4;}</style></defs><g transform="translate(-913 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(913 20)"/><g transform="translate(925 31.556)"><path class="b" d="M21.778,5.444a2.334,2.334,0,0,0-2.333-2.333H17.111v-1.6a1.556,1.556,0,0,0-3.111,0v1.6H7.778v-1.6a1.556,1.556,0,0,0-3.111,0v1.6H2.333A2.333,2.333,0,0,0,0,5.444V9.333H21.778ZM21,10.889a7,7,0,1,0,7,7A7,7,0,0,0,21,10.889Zm2.333,7.778H21a.777.777,0,0,1-.778-.778V14.817a.778.778,0,0,1,1.556,0v2.294h1.556a.778.778,0,1,1,0,1.556Z"/><path class="c" d="M21.778,192H21c.263,0,.521.016.778.039Zm-9.333,8.556A8.556,8.556,0,0,1,21,192H0v13.222a2.334,2.334,0,0,0,2.333,2.333H16.09A8.538,8.538,0,0,1,12.444,200.556Z" transform="translate(0 -182.667)"/></g></g></svg>
              <span class="title">رزرو وقت</span>
            </nuxt-link>
            <nuxt-link to="/patients">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-1103 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(1103 20)"/><g transform="translate(1113 33)"><path class="b" d="M455.875,322.625h-2.1v-2.1a.525.525,0,0,0-.525-.525h-2.1a.525.525,0,0,0-.525.525v2.1h-2.1a.525.525,0,0,0-.525.525v2.1a.525.525,0,0,0,.525.525h2.1v2.1a.525.525,0,0,0,.525.525h2.1a.525.525,0,0,0,.525-.525v-2.1h2.1a.525.525,0,0,0,.525-.525v-2.1A.527.527,0,0,0,455.875,322.625Z" transform="translate(-428.4 -306)"/><path class="c" d="M5.6,7A3.5,3.5,0,1,0,2.1,3.5,3.5,3.5,0,0,0,5.6,7ZM14,14A4.55,4.55,0,1,0,9.485,9.45,4.517,4.517,0,0,0,14,14Zm8.4-7a3.5,3.5,0,1,0-3.5-3.5A3.5,3.5,0,0,0,22.4,7ZM20.825,21.175h-.7A1.927,1.927,0,0,1,18.2,19.25v-2.1a1.989,1.989,0,0,1,.476-1.254,6.5,6.5,0,0,0-2.493-.5H11.817A6.034,6.034,0,0,0,5.6,21.232,1.205,1.205,0,0,0,6.842,22.4H20.908a1.883,1.883,0,0,1-.083-.525ZM24.146,8.4H21.44a3.648,3.648,0,0,0-1.569.361,5.994,5.994,0,0,1,.07.689A5.9,5.9,0,0,1,18.49,13.3h2.787a1.909,1.909,0,0,1,1.473-.7h2.1a1.912,1.912,0,0,1,1.472.7h.907A.8.8,0,0,0,28,12.482,3.973,3.973,0,0,0,24.146,8.4ZM8.046,9.45a5.828,5.828,0,0,1,.07-.7A3.168,3.168,0,0,0,6.558,8.4h-2.7A3.974,3.974,0,0,0,0,12.482a.8.8,0,0,0,.771.818H9.5A5.893,5.893,0,0,1,8.046,9.45Z"/></g></g></svg>
              <span class="title">بیماران</span>
            </nuxt-link>
            <nuxt-link to="/messages">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-709 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(709 20)"/><g transform="translate(719 32.45)"><path class="b" d="M272.8,130.761v8.361a2.772,2.772,0,0,1-2.8,2.761h-1.4v2.373a.426.426,0,0,1-.678.344l-3.62-2.718-5.541.079a2.772,2.772,0,0,1-2.761-2.8v-1.4h4.2a4.208,4.208,0,0,0,4.2-4.2V128H270A2.8,2.8,0,0,1,272.8,130.761Z" transform="translate(-244.8 -122.4)"/><path class="c" d="M15.4,0H2.8A2.8,2.8,0,0,0,0,2.761V11.2A2.807,2.807,0,0,0,2.8,14H4.2v2.373a.426.426,0,0,0,.678.345L8.5,14,15.4,14a2.8,2.8,0,0,0,2.8-2.8V2.761A2.8,2.8,0,0,0,15.4,0Z"/></g></g></svg>
              <span class="title">پیامرسان</span>
            </nuxt-link>
            <nuxt-link
              v-if="!isDoctor"
              to="/images">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-709 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(709 20)"/><g transform="translate(719 32.45)"><path class="b" d="M272.8,130.761v8.361a2.772,2.772,0,0,1-2.8,2.761h-1.4v2.373a.426.426,0,0,1-.678.344l-3.62-2.718-5.541.079a2.772,2.772,0,0,1-2.761-2.8v-1.4h4.2a4.208,4.208,0,0,0,4.2-4.2V128H270A2.8,2.8,0,0,1,272.8,130.761Z" transform="translate(-244.8 -122.4)"/><path class="c" d="M15.4,0H2.8A2.8,2.8,0,0,0,0,2.761V11.2A2.807,2.807,0,0,0,2.8,14H4.2v2.373a.426.426,0,0,0,.678.345L8.5,14,15.4,14a2.8,2.8,0,0,0,2.8-2.8V2.761A2.8,2.8,0,0,0,15.4,0Z"/></g></g></svg>
              <span class="title">ارسال تصاویر</span>
            </nuxt-link>
          </div>
          <div class="organization-box">
            <img alt="" :src="getOrganizationLogo">
            <div class="organization-name">{{ loginUser.organization.name }}</div>
          </div>
        </div>
        <div class="nav-bar second">
          <div class="links">
            <nuxt-link to="/organization">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.c{opacity:0.4;}</style></defs><g transform="translate(-1303 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(1303 20)"/><g transform="translate(1316.5 30)"><path class="b" d="M74.5,3.5a3.5,3.5,0,0,0-7,0A3.5,3.5,0,0,0,64,7v.875a.876.876,0,0,0,.875.875h12.25A.878.878,0,0,0,78,7.875V7A3.5,3.5,0,0,0,74.5,3.5ZM71,4.813A1.313,1.313,0,1,1,72.313,3.5,1.311,1.311,0,0,1,71,4.813Zm-5.25,15.75a1.313,1.313,0,1,0,1.313,1.313A1.313,1.313,0,0,0,65.75,20.563Zm3.757-8.055-2.882,2.882-1.131-1.132a.875.875,0,0,0-1.237,1.237l1.75,1.75a.88.88,0,0,0,.619.256.871.871,0,0,0,.619-.256l3.5-3.5a.874.874,0,1,0-1.236-1.237Z" transform="translate(-60.5)"/><path class="c" d="M18.375,64H14a3.5,3.5,0,0,1,3.5,3.5v.875a.878.878,0,0,1-.875.875H4.375a.876.876,0,0,1-.875-.875V67.5A3.5,3.5,0,0,1,7,64H2.625A2.625,2.625,0,0,0,0,66.625v19.25A2.625,2.625,0,0,0,2.625,88.5h15.75A2.625,2.625,0,0,0,21,85.875V66.625A2.625,2.625,0,0,0,18.375,64ZM5.25,83.688a1.313,1.313,0,1,1,1.313-1.312A1.313,1.313,0,0,1,5.25,83.688ZM6.125,78a.871.871,0,0,1-.619-.256l-1.75-1.75a.875.875,0,1,1,1.237-1.237l1.131,1.132,2.881-2.881a.875.875,0,0,1,1.237,1.237l-3.5,3.5A.882.882,0,0,1,6.125,78Zm10.5,5.25h-7a.875.875,0,0,1,0-1.75h7a.875.875,0,0,1,0,1.75Zm0-5.25h-5.25a.875.875,0,0,1,0-1.75h5.25a.875.875,0,0,1,0,1.75Z" transform="translate(0 -60.5)"/></g></g></svg>
              <span class="title">پذیرش</span>
              <span class="has-notification"></span>
            </nuxt-link>
            <nuxt-link
              v-if="loginUser.organization && loginUser.organization.profession_id != 1 && loginUser.organization.profession_id != 2 && loginUser.organization.profession_id != 3"
              to="/appointment"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.c{opacity:0.4;}</style></defs><g transform="translate(-913 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(913 20)"/><g transform="translate(925 31.556)"><path class="b" d="M21.778,5.444a2.334,2.334,0,0,0-2.333-2.333H17.111v-1.6a1.556,1.556,0,0,0-3.111,0v1.6H7.778v-1.6a1.556,1.556,0,0,0-3.111,0v1.6H2.333A2.333,2.333,0,0,0,0,5.444V9.333H21.778ZM21,10.889a7,7,0,1,0,7,7A7,7,0,0,0,21,10.889Zm2.333,7.778H21a.777.777,0,0,1-.778-.778V14.817a.778.778,0,0,1,1.556,0v2.294h1.556a.778.778,0,1,1,0,1.556Z"/><path class="c" d="M21.778,192H21c.263,0,.521.016.778.039Zm-9.333,8.556A8.556,8.556,0,0,1,21,192H0v13.222a2.334,2.334,0,0,0,2.333,2.333H16.09A8.538,8.538,0,0,1,12.444,200.556Z" transform="translate(0 -182.667)"/></g></g></svg>
              <span class="title">رزرو وقت</span>
            </nuxt-link>
            <nuxt-link to="/patients">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-1103 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(1103 20)"/><g transform="translate(1113 33)"><path class="b" d="M455.875,322.625h-2.1v-2.1a.525.525,0,0,0-.525-.525h-2.1a.525.525,0,0,0-.525.525v2.1h-2.1a.525.525,0,0,0-.525.525v2.1a.525.525,0,0,0,.525.525h2.1v2.1a.525.525,0,0,0,.525.525h2.1a.525.525,0,0,0,.525-.525v-2.1h2.1a.525.525,0,0,0,.525-.525v-2.1A.527.527,0,0,0,455.875,322.625Z" transform="translate(-428.4 -306)"/><path class="c" d="M5.6,7A3.5,3.5,0,1,0,2.1,3.5,3.5,3.5,0,0,0,5.6,7ZM14,14A4.55,4.55,0,1,0,9.485,9.45,4.517,4.517,0,0,0,14,14Zm8.4-7a3.5,3.5,0,1,0-3.5-3.5A3.5,3.5,0,0,0,22.4,7ZM20.825,21.175h-.7A1.927,1.927,0,0,1,18.2,19.25v-2.1a1.989,1.989,0,0,1,.476-1.254,6.5,6.5,0,0,0-2.493-.5H11.817A6.034,6.034,0,0,0,5.6,21.232,1.205,1.205,0,0,0,6.842,22.4H20.908a1.883,1.883,0,0,1-.083-.525ZM24.146,8.4H21.44a3.648,3.648,0,0,0-1.569.361,5.994,5.994,0,0,1,.07.689A5.9,5.9,0,0,1,18.49,13.3h2.787a1.909,1.909,0,0,1,1.473-.7h2.1a1.912,1.912,0,0,1,1.472.7h.907A.8.8,0,0,0,28,12.482,3.973,3.973,0,0,0,24.146,8.4ZM8.046,9.45a5.828,5.828,0,0,1,.07-.7A3.168,3.168,0,0,0,6.558,8.4h-2.7A3.974,3.974,0,0,0,0,12.482a.8.8,0,0,0,.771.818H9.5A5.893,5.893,0,0,1,8.046,9.45Z"/></g></g></svg>
              <span class="title">بیماران</span>
            </nuxt-link>
            <nuxt-link to="/messages">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-709 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(709 20)"/><g transform="translate(719 32.45)"><path class="b" d="M272.8,130.761v8.361a2.772,2.772,0,0,1-2.8,2.761h-1.4v2.373a.426.426,0,0,1-.678.344l-3.62-2.718-5.541.079a2.772,2.772,0,0,1-2.761-2.8v-1.4h4.2a4.208,4.208,0,0,0,4.2-4.2V128H270A2.8,2.8,0,0,1,272.8,130.761Z" transform="translate(-244.8 -122.4)"/><path class="c" d="M15.4,0H2.8A2.8,2.8,0,0,0,0,2.761V11.2A2.807,2.807,0,0,0,2.8,14H4.2v2.373a.426.426,0,0,0,.678.345L8.5,14,15.4,14a2.8,2.8,0,0,0,2.8-2.8V2.761A2.8,2.8,0,0,0,15.4,0Z"/></g></g></svg>
              <span class="title">پیامرسان</span>
            </nuxt-link>
            <nuxt-link
              v-if="!isDoctor"
              to="/images">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-709 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(709 20)"/><g transform="translate(719 32.45)"><path class="b" d="M272.8,130.761v8.361a2.772,2.772,0,0,1-2.8,2.761h-1.4v2.373a.426.426,0,0,1-.678.344l-3.62-2.718-5.541.079a2.772,2.772,0,0,1-2.761-2.8v-1.4h4.2a4.208,4.208,0,0,0,4.2-4.2V128H270A2.8,2.8,0,0,1,272.8,130.761Z" transform="translate(-244.8 -122.4)"/><path class="c" d="M15.4,0H2.8A2.8,2.8,0,0,0,0,2.761V11.2A2.807,2.807,0,0,0,2.8,14H4.2v2.373a.426.426,0,0,0,.678.345L8.5,14,15.4,14a2.8,2.8,0,0,0,2.8-2.8V2.761A2.8,2.8,0,0,0,15.4,0Z"/></g></g></svg>
              <span class="title">ارسال تصاویر</span>
            </nuxt-link>
          </div>
        </div>
      </v-container>
    </v-app-bar>
    <v-navigation-drawer
      v-model="rightDrawer"
      right
      temporary
      fixed
    >
      <v-list>
        <v-list-item
          to="/organization"
        >
          <v-list-item-action>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.c{opacity:0.4;}</style></defs><g transform="translate(-1303 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(1303 20)"/><g transform="translate(1316.5 30)"><path class="b" d="M74.5,3.5a3.5,3.5,0,0,0-7,0A3.5,3.5,0,0,0,64,7v.875a.876.876,0,0,0,.875.875h12.25A.878.878,0,0,0,78,7.875V7A3.5,3.5,0,0,0,74.5,3.5ZM71,4.813A1.313,1.313,0,1,1,72.313,3.5,1.311,1.311,0,0,1,71,4.813Zm-5.25,15.75a1.313,1.313,0,1,0,1.313,1.313A1.313,1.313,0,0,0,65.75,20.563Zm3.757-8.055-2.882,2.882-1.131-1.132a.875.875,0,0,0-1.237,1.237l1.75,1.75a.88.88,0,0,0,.619.256.871.871,0,0,0,.619-.256l3.5-3.5a.874.874,0,1,0-1.236-1.237Z" transform="translate(-60.5)"/><path class="c" d="M18.375,64H14a3.5,3.5,0,0,1,3.5,3.5v.875a.878.878,0,0,1-.875.875H4.375a.876.876,0,0,1-.875-.875V67.5A3.5,3.5,0,0,1,7,64H2.625A2.625,2.625,0,0,0,0,66.625v19.25A2.625,2.625,0,0,0,2.625,88.5h15.75A2.625,2.625,0,0,0,21,85.875V66.625A2.625,2.625,0,0,0,18.375,64ZM5.25,83.688a1.313,1.313,0,1,1,1.313-1.312A1.313,1.313,0,0,1,5.25,83.688ZM6.125,78a.871.871,0,0,1-.619-.256l-1.75-1.75a.875.875,0,1,1,1.237-1.237l1.131,1.132,2.881-2.881a.875.875,0,0,1,1.237,1.237l-3.5,3.5A.882.882,0,0,1,6.125,78Zm10.5,5.25h-7a.875.875,0,0,1,0-1.75h7a.875.875,0,0,1,0,1.75Zm0-5.25h-5.25a.875.875,0,0,1,0-1.75h5.25a.875.875,0,0,1,0,1.75Z" transform="translate(0 -60.5)"/></g></g></svg>
          </v-list-item-action>
          <v-list-item-title
            class="title"
          >
            پذیرش
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="loginUser.organization && loginUser.organization.profession_id != 1 && loginUser.organization.profession_id != 2 && loginUser.organization.profession_id != 3"
          to="/appointment"
        >
          <v-list-item-action>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.c{opacity:0.4;}</style></defs><g transform="translate(-913 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(913 20)"/><g transform="translate(925 31.556)"><path class="b" d="M21.778,5.444a2.334,2.334,0,0,0-2.333-2.333H17.111v-1.6a1.556,1.556,0,0,0-3.111,0v1.6H7.778v-1.6a1.556,1.556,0,0,0-3.111,0v1.6H2.333A2.333,2.333,0,0,0,0,5.444V9.333H21.778ZM21,10.889a7,7,0,1,0,7,7A7,7,0,0,0,21,10.889Zm2.333,7.778H21a.777.777,0,0,1-.778-.778V14.817a.778.778,0,0,1,1.556,0v2.294h1.556a.778.778,0,1,1,0,1.556Z"/><path class="c" d="M21.778,192H21c.263,0,.521.016.778.039Zm-9.333,8.556A8.556,8.556,0,0,1,21,192H0v13.222a2.334,2.334,0,0,0,2.333,2.333H16.09A8.538,8.538,0,0,1,12.444,200.556Z" transform="translate(0 -182.667)"/></g></g></svg>
          </v-list-item-action>
          <v-list-item-title
            class="title"
          >
            رزرو وقت
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/patients"
        >
          <v-list-item-action>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-1103 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(1103 20)"/><g transform="translate(1113 33)"><path class="b" d="M455.875,322.625h-2.1v-2.1a.525.525,0,0,0-.525-.525h-2.1a.525.525,0,0,0-.525.525v2.1h-2.1a.525.525,0,0,0-.525.525v2.1a.525.525,0,0,0,.525.525h2.1v2.1a.525.525,0,0,0,.525.525h2.1a.525.525,0,0,0,.525-.525v-2.1h2.1a.525.525,0,0,0,.525-.525v-2.1A.527.527,0,0,0,455.875,322.625Z" transform="translate(-428.4 -306)"/><path class="c" d="M5.6,7A3.5,3.5,0,1,0,2.1,3.5,3.5,3.5,0,0,0,5.6,7ZM14,14A4.55,4.55,0,1,0,9.485,9.45,4.517,4.517,0,0,0,14,14Zm8.4-7a3.5,3.5,0,1,0-3.5-3.5A3.5,3.5,0,0,0,22.4,7ZM20.825,21.175h-.7A1.927,1.927,0,0,1,18.2,19.25v-2.1a1.989,1.989,0,0,1,.476-1.254,6.5,6.5,0,0,0-2.493-.5H11.817A6.034,6.034,0,0,0,5.6,21.232,1.205,1.205,0,0,0,6.842,22.4H20.908a1.883,1.883,0,0,1-.083-.525ZM24.146,8.4H21.44a3.648,3.648,0,0,0-1.569.361,5.994,5.994,0,0,1,.07.689A5.9,5.9,0,0,1,18.49,13.3h2.787a1.909,1.909,0,0,1,1.473-.7h2.1a1.912,1.912,0,0,1,1.472.7h.907A.8.8,0,0,0,28,12.482,3.973,3.973,0,0,0,24.146,8.4ZM8.046,9.45a5.828,5.828,0,0,1,.07-.7A3.168,3.168,0,0,0,6.558,8.4h-2.7A3.974,3.974,0,0,0,0,12.482a.8.8,0,0,0,.771.818H9.5A5.893,5.893,0,0,1,8.046,9.45Z"/></g></g></svg>
          </v-list-item-action>
          <v-list-item-title
            class="title"
          >
            بیماران
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          to="/messages"
        >
          <v-list-item-action>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-709 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(709 20)"/><g transform="translate(719 32.45)"><path class="b" d="M272.8,130.761v8.361a2.772,2.772,0,0,1-2.8,2.761h-1.4v2.373a.426.426,0,0,1-.678.344l-3.62-2.718-5.541.079a2.772,2.772,0,0,1-2.761-2.8v-1.4h4.2a4.208,4.208,0,0,0,4.2-4.2V128H270A2.8,2.8,0,0,1,272.8,130.761Z" transform="translate(-244.8 -122.4)"/><path class="c" d="M15.4,0H2.8A2.8,2.8,0,0,0,0,2.761V11.2A2.807,2.807,0,0,0,2.8,14H4.2v2.373a.426.426,0,0,0,.678.345L8.5,14,15.4,14a2.8,2.8,0,0,0,2.8-2.8V2.761A2.8,2.8,0,0,0,15.4,0Z"/></g></g></svg>
          </v-list-item-action>
          <v-list-item-title
            class="title"
          >
            پیامرسان
          </v-list-item-title>
        </v-list-item>
        <v-list-item
          v-if="!isDoctor"
          to="/images"
        >
          <v-list-item-action>
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 48 48"><defs><style>.a,.b,.c{fill:#f1f2f5;}.a{opacity:0.16;}.b{opacity:0.4;}</style></defs><g transform="translate(-709 -20)"><circle class="a" cx="24" cy="24" r="24" transform="translate(709 20)"/><g transform="translate(719 32.45)"><path class="b" d="M272.8,130.761v8.361a2.772,2.772,0,0,1-2.8,2.761h-1.4v2.373a.426.426,0,0,1-.678.344l-3.62-2.718-5.541.079a2.772,2.772,0,0,1-2.761-2.8v-1.4h4.2a4.208,4.208,0,0,0,4.2-4.2V128H270A2.8,2.8,0,0,1,272.8,130.761Z" transform="translate(-244.8 -122.4)"/><path class="c" d="M15.4,0H2.8A2.8,2.8,0,0,0,0,2.761V11.2A2.807,2.807,0,0,0,2.8,14H4.2v2.373a.426.426,0,0,0,.678.345L8.5,14,15.4,14a2.8,2.8,0,0,0,2.8-2.8V2.761A2.8,2.8,0,0,0,15.4,0Z"/></g></g></svg>
          </v-list-item-action>
          <v-list-item-title
            class="title"
          >
            ارسال تصاویر
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  data () {
    return {
      clipped: false,
      rightDrawer: false,
      items: [
        {
          link: '/admin',
          title: 'پنل مدیریت',
          isAdmin: true,
        },
        {
          link: '/profile',
          title: 'پروفایل من',
          isAdmin: false,
        },
        {
          link: '/admin/reports',
          title: 'گزارش ها',
          isAdmin: true,
        },
      ]
    }
  },
  methods: {
    goToPage(route) {
      this.$router.push(route)
    },
    async exit() {
      await this.$store.dispatch('login/exit')
      await this.$router.push('/')
    },
    canShow(item) {
      return !item.isAdmin || this.isAdmin
    }
  },
  computed: {
    loginUser() {
      return this.$store.getters['login/getUser']
    },
    isAdmin() {
      return this.loginUser.user_group_id === 2
    },
    isDoctor() {
      return this.loginUser.organization_id != 1 && this.loginUser.organization_id != 2 && this.loginUser.organization_id != 3
    },
    getOrganizationLogo() {
      return this.loginUser.organization.logo_link ?? '/images/header/hospital.svg';
    }
  }
}
</script>

<style scoped>

</style>
