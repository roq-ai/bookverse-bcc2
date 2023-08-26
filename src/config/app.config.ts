interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Reader'],
  customerRoles: [],
  tenantRoles: ['Reader', 'Contributor'],
  tenantName: 'Publisher',
  applicationName: 'BookVerse',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
};
