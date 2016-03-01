using System.Web.Mvc;

namespace SimpleAngularJSAppWithMVC.Controllers
{
    using AngularMVC.DbUtil;

    using Newtonsoft.Json;

    public class UserInfoController : Controller
    {
        public string SaveUserInfoDetails(dynamic UserInfoDetails)
        {
            
            new DbUtility().SaveDocument(UserInfoDetails, "UserInfo");
            return JsonConvert.SerializeObject(new {Result=1,Message="Success",Status=1});
        }
        public JsonResult getUserInfoDetails()
        {
            return Json(new DbUtility().GetAllDocuments("UserInfo").Replace("ObjectId(","").Replace(")",""),JsonRequestBehavior.AllowGet);
        }
        public JsonResult getCheckBoxCheckedFromDB()
        {
            string[] checkboxchecked = {"A","B","C"};
            return Json(JsonConvert.SerializeObject(checkboxchecked), JsonRequestBehavior.AllowGet);
        }
        [System.Web.Http.HttpPost]
        public JsonResult validateLoginDetails(dynamic loginDetails)
        {
            dynamic ld = JsonConvert.DeserializeObject(loginDetails);
            string[] keys = { "email", "Password" };
            string[] values = { ld.email, ld.password };
            if (loginDetails != null)
            {
                return Json(new DbUtility().findbyMultipleKey(keys, values, "UserInfo"), JsonRequestBehavior.AllowGet);
            }
            return null;
        }
        [System.Web.Http.HttpPost]
        public JsonResult getProductList()
        {
            return Json(new DbUtility().GetAllDocumentsWithObjectId("Master_Products"), JsonRequestBehavior.AllowGet);

        }
        [System.Web.Http.HttpPost]
        public string placeOrder(string Id,string productList)
        {
            new DbUtility().updateOrdersofUser(Id, productList, "UserInfo");
            return "Success";
        }
    }
}
