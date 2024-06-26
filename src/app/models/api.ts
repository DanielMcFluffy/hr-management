// path that has '/' suffix will need to append with id

export type Api_URL_GET = 
'Admin' |
'Admin/View/'|
'Employee' |
'Employee/View/' |
'Permission' |
'Permission/View/' | 
'Position' | 
'Position/View/'  

export type Api_URL_POST =
'Account/Login' |
'Account/Logout' |
'Account/RefreshToken' |
'Admin/Create' |
'Admin/Update/' |
'Employee/Create' |
'Employee/Update/' |
'Permission/Create' |
'Permission/Update/' |
'Position/Create' |
'Position/Update/' 

export type Api_URL_DELETE = 
'Admin/' | 
'Employee/' |
'Permission/'|
'Position/'