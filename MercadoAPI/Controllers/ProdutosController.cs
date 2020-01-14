using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MercadoAPI.Models;
using MercadoAPI.Data;

namespace MercadoAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutosController : ControllerBase
    {
        private readonly BlazorMercadoContext _context;
        private readonly IProdutosRepository<Produtos> _repo;

        public ProdutosController(BlazorMercadoContext context, IProdutosRepository<Produtos> repo)
        {
            _context = context;
            _repo = repo;
        }

        // GET: api/Produtos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Produtos>>> GetProdutos()
        {
            return await _context.Produtos.ToListAsync();
        }

        // GET: api/Produtos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Produtos>> GetProdutos(int id)
        {
            var produtos = await _context.Produtos.FindAsync(id);

            if (produtos == null)
            {
                return NotFound();
            }

            return produtos;
        }

        // PUT: api/Produtos/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutProdutos(int id, Produtos produtos)
        {
            if (id != produtos.Id)
            {
                return BadRequest();
            }

            _context.Entry(produtos).State = EntityState.Modified;

            try
            {
                _repo.Update(produtos);
                var save = await _repo.SaveAsync(produtos);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ProdutosExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Produtos
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for
        // more details see https://aka.ms/RazorPagesCRUD.
        [HttpPost]
        public async Task<ActionResult<Produtos>> PostProdutos(Produtos produtos)
        {
            _context.Produtos.Add(produtos);
            try
            {
                _repo.Add(produtos);
                var save = await _repo.SaveAsync(produtos);
            }
            catch (DbUpdateException)
            {
                if (ProdutosExists(produtos.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtAction("GetProdutos", new { id = produtos.Id }, produtos);
        }

        // DELETE: api/Produtos/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Produtos>> DeleteProdutos(int id)
        {
            var produtos = await _context.Produtos.FindAsync(id);
            if (produtos == null)
            {
                return NotFound();
            }

            _repo.Delete(produtos);
            var save = await _repo.SaveAsync(produtos);

            return produtos;
        }

        private bool ProdutosExists(int id)
        {
            return _context.Produtos.Any(e => e.Id == id);
        }
    }
}
