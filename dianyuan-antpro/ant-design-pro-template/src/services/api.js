import { stringify } from 'qs';
import request from '@/utils/request';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

// 浏览业主信息
export async function queryBasic(params) {
  return request(`/r/ownerinfo/index?${stringify(params)}`);
}

// 添加业主信息
export async function addOwner(params) {
  return request('/r/ownerinfo/create', {
    method: 'POST',
    body: params,
  });
}

// 修改业主信息
export async function updateOwner(params) {
  return request('/r/ownerinfo/update', {
    method: 'POST',
    body: params,
  });

}

// 删除业主信息
export async function removeOwner(params) {
  return request('/r/ownerinfo/delete', {
    method: 'POST',
    body: params,
  });
}
// 查询业主信息
export async function searchOwner(params) {
  return request('/r/ownerinfo/search', {
    method: 'POST',
    body: params,
  });
}


// 浏览租户信息
export async function queryLessee(params) {
  return request(`/r/lesseeinfo/index?${stringify(params)}`);
}

// 添加租户信息
export async function addLessee(params) {
  return request('/r/lesseeinfo/create', {
    method: 'POST',
    body: params,
  });
}

// 修改租户信息
export async function updateLessee(params) {
  return request('/r/lesseeinfo/update', {
    method: 'POST',
    body: params,
  });

}

// 删除租户信息
export async function removeLessee(params) {
  return request('/r/lesseeinfo/delete', {
    method: 'POST',
    body: params,
  });
}
// 查询业主信息
export async function searchLessee(params) {
  return request('/r/lesseeinfo/search', {
    method: 'POST',
    body: params,
  });
}

// 加载房源信息
export async function queryHouse(params) {
  return request(`/r/houseinfo/index?${stringify(params)}`);
}
// 添加房源信息
export async function addHouse(params,houseimage) {
  return request('/r/houseinfo/create', {
    method: 'POST',
    body: {params,houseimage}
  });
}

// 修改房源信息
export async function updateHouse(params,houseimage) {
  console.log(houseimage);
  return request('/r/houseinfo/update', {
    method: 'POST',
    body: {params,houseimage}
  });

}

// 删除房源信息
export async function removeHouse(params) {
  return request('/r/houseinfo/delete', {
    method: 'POST',
    body: params,
  });
}
// 查询房源信息
export async function searchHouse(params) {
  return request('/r/houseinfo/search', {
    method: 'POST',
    body: params,
  });
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params) {
  return request('/api/rule', {
    method: 'POST',
    body: {
      ...params,
      method: 'update',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    body: params,
  });
}

export async function fakeChartData() {
  return request('/api/fake_chart_data');
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function removeFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'delete',
    },
  });
}

export async function addFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'post',
    },
  });
}

export async function updateFakeList(params) {
  const { count = 5, ...restParams } = params;
  return request(`/api/fake_list?count=${count}`, {
    method: 'POST',
    body: {
      ...restParams,
      method: 'update',
    },
  });
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    body: params,
  });
}

export async function queryNotices() {
  return request('/api/notices');
}

export async function getFakeCaptcha(mobile) {
  return request(`/api/captcha?mobile=${mobile}`);
}
