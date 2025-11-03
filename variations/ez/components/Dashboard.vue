<template>
  <DashboardCard title="Digitální zpěvník">
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
    <BasicClickable to="/o-zpevniku" class="list-item">
      <BasicIcon name="newspaper" class="list-icon" />
      <span>Novinky</span>
    </BasicClickable>
    <BasicClickable
      :href="
        'https://glowspace.atlassian.net/servicedesk/customer/portal/1/group/6/create/20?customfield_10056=' +
        encodeURIComponent($config.public.siteUrl + $route.fullPath)
      "
      class="list-item"
    >
      <BasicIcon name="warning" class="list-icon" />
      <span>Nahlásit chybu</span>
    </BasicClickable>
  </DashboardCard>
  <DashboardCard title="Další možnosti">
    <BasicClickable
      href="https://eshop.e-cirkev.cz/produkty/zpevnik/"
      class="list-item"
    >
      <BasicIcon name="book_2" class="list-icon" />
      <span>Koupit zpěvník</span>
    </BasicClickable>
    <BasicClickable to="/materialy" class="list-item">
      <BasicIcon name="download" class="list-icon" />
      <span>Materiály ke stažení</span>
    </BasicClickable>
    <BasicClickable
      href="https://soundcloud.com/ecirkev/sets/nov-evangelick-zp-vn-k-2021"
      class="list-item"
    >
      <BasicIcon name="headphones" class="list-icon" />
      <span>Nahrávky písní</span>
    </BasicClickable>
  </DashboardCard>
</template>
