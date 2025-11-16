<template>
  <DashboardNews />
  <DashboardSongbooks />
  <DashboardCard title="Další možnosti">
    <BasicClickable
      href="https://play.google.com/store/apps/details?id=cce.evangelicky_zpevnik"
      class="list-item"
    >
      <BasicIcon name="android" class="list-icon" />
      <span>Aplikace pro Android</span>
    </BasicClickable>
    <BasicClickable
      href="https://apps.apple.com/us/app/evangelick%C3%BD-zp%C4%9Bvn%C3%ADk/id6502984934"
      class="list-item"
    >
      <BasicIcon name="ios" class="list-icon" />
      <span>Aplikace pro iOS</span>
    </BasicClickable>
    <BasicClickable :href="getReportLink()" class="list-item">
      <BasicIcon name="warning" class="list-icon" />
      <span>Nahlásit chybu</span>
    </BasicClickable>
  </DashboardCard>
</template>
