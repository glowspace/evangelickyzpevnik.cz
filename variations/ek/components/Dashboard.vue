<template>
  <DashboardCard title="Digitální zpěvník">
    <BasicClickable
      href="https://play.google.com/store/apps/details?id=sceav.evangelicky_kancional"
      class="list-item"
    >
      <BasicIcon name="android" class="list-icon" />
      <span>Aplikace pro Android</span>
    </BasicClickable>
    <!-- <BasicClickable
      href="https://apps.apple.com/us/app/evangelick%C3%BD-zp%C4%9Bvn%C3%ADk/id6502984934"
      class="list-item"
    >
      <BasicIcon name="ios" class="list-icon" />
      <span>Aplikace pro iOS</span>
    </BasicClickable> -->
    <BasicClickable to="/o-projektu" class="list-item">
      <BasicIcon name="info" class="list-icon" />
      <span>O projektu</span>
    </BasicClickable>
    <BasicClickable :href="getReportLink()" class="list-item">
      <BasicIcon name="warning" class="list-icon" />
      <span>Nahlásit chybu</span>
    </BasicClickable>
  </DashboardCard>
  <DashboardCard title="Další možnosti">
    <BasicClickable href="https://eshop.ecmise.cz/produkt/evangelicky-kancional/" class="list-item">
      <BasicIcon name="book_2" class="list-icon" />
      <span>Koupit kancionál</span>
    </BasicClickable>
  </DashboardCard>
</template>
