namespace SimpleAngularJSAppWithMVC.Controllers
{
    using System.Web.Mvc;

    using AngularMVC.DbUtil;

    using Newtonsoft.Json;

    public class MasterDataController : Controller
    {

        public MasterDataController()
        {

        }

        [System.Web.Http.HttpGet]
        public ActionResult getCountryList()
        {
            return Json(new DbUtility().GetAllDocuments("Master_Country").Replace("ObjectId(", "").Replace(")", ""), JsonRequestBehavior.AllowGet);
        }

        [System.Web.Http.HttpPost]
        public ActionResult getStateList(string countryName)
        {
            if (countryName != null)
            {
                string temp = (string)JsonConvert.DeserializeObject(countryName);
                return Json(
                    new DbUtility().GetDocumentById("Master_State", "CountryName", temp),
                    JsonRequestBehavior.AllowGet);
            }
            return null;
        }

        [System.Web.Http.HttpPost]
        public ActionResult getDistrictList(string stateName)
        {
            if (stateName != null)
            {
                string temp = (string)JsonConvert.DeserializeObject(stateName);
                return Json(
                    new DbUtility().GetDocumentById("Master_District", "StateName", temp),
                    JsonRequestBehavior.AllowGet);
            }
            return null;
        }

        [System.Web.Http.HttpPost]
        public ActionResult getTalukaList(string districtName)
        {
            if (districtName != null)
            {
                string temp = (string)JsonConvert.DeserializeObject(districtName);
                return Json(
                    new DbUtility().GetDocumentById("Master_Taluka", "DistrictName", temp),
                    JsonRequestBehavior.AllowGet);
            }
            return null;
        }

        //[System.Web.Http.HttpGet]
        //public ActionResult getCategoryList()
        //{
        //    return Json(((MasterCategoryService) iservCategoryService).GetAll(), JsonRequestBehavior.AllowGet);
        //}

        //[System.Web.Http.HttpPost]
        //public ActionResult getCasteList(string categoryName)
        //{
        //    if (categoryName != null)
        //    {
        //        string tempcategoryName = (string)JsonConvert.DeserializeObject(categoryName);
        //        return Json(
        //            ((MasterCasteService)this.iservCasteService).getCasteList("CategoryName", tempcategoryName),
        //            JsonRequestBehavior.AllowGet);
        //    }
        //    return null;
        //}

        //[System.Web.Http.HttpGet]
        //public ActionResult getReligionList()
        //{
        //    return Json(((MasterReligionService)this.iservReligionService).GetAll(), JsonRequestBehavior.AllowGet);
        //}

        //[System.Web.Http.HttpGet]
        //public ActionResult getSocialReservationList()
        //{
        //    return Json(((MasterSocialReservationService)this.iservSocialReservationService).GetAll(), JsonRequestBehavior.AllowGet);
        //}

        //[System.Web.Http.HttpGet]
        //public ActionResult getMaritalStatusList()
        //{
        //    return Json(((MasterMaritalStatusService)this.iservMasterMaritalStatusService).GetAll(), JsonRequestBehavior.AllowGet);
        //}

        //[System.Web.Http.HttpGet]
        //public ActionResult getMarksheetList()
        //{
        //    return Json(((MasterMarksheetService)this.iservMasterMarksheetService).GetAll(), JsonRequestBehavior.AllowGet);
        //}

        //[System.Web.Http.HttpGet]
        //public ActionResult getGenderList()
        //{
        //    return Json(((MasterGenderService)this.iservMasterGenderService).GetAll(), JsonRequestBehavior.AllowGet);
        //}

        //[System.Web.Http.HttpGet]
        //public ActionResult getAreaList()
        //{
        //    return Json(((MasterAreaService)this.iservMasterAreaService).GetAll(), JsonRequestBehavior.AllowGet);
        //}

        //[System.Web.Http.HttpGet]
        //public ActionResult getPHTypeList()
        //{
        //    return Json(((MasterPHTypeService)this.iservMasterPHTypeService).GetAll(), JsonRequestBehavior.AllowGet);
        //}
    }
}
