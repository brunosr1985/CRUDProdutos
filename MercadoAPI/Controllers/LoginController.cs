using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using MercadoAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MercadoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        // POST: api/Login
        [HttpPost]
        public string VerificaUsuarioSenha([FromBody] Login DadosLogin)
        {
            HttpWebRequest request = (HttpWebRequest)WebRequest.Create("https://dev.sitemercado.com.br/api/login");
            string encoded = System.Convert.ToBase64String(System.Text.Encoding.GetEncoding("UTF-8").GetBytes(DadosLogin.Usuario + ":" + DadosLogin.Senha));
            request.Headers.Add("Authorization", "Basic " + encoded);
            request.ContentType = "application/xml";
            request.Method = "POST";
            HttpWebResponse response;
            response = (HttpWebResponse)request.GetResponse();
            Stream responseStream = response.GetResponseStream();
            var responseStr = new StreamReader(responseStream).ReadToEnd();

            if(responseStr.Contains("true"))
            {
                return "Autenticado";
            }
            else
            {
                return "Houve um problema com a autenticação " + responseStr;
            }
            
        }
    }
}
