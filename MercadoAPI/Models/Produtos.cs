using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace MercadoAPI.Models
{
    public partial class Produtos
    {
        [Key]
        public int Id { get; set; }
        public string Nome { get; set; }
        public float Valor { get; set; }
        public string Imagem { get; set; }
    }
}
