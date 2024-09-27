import React, { useState, useEffect } from "react";

const BuscarDados = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [posts, setPosts] = useState([]);
  const [comentarios, setComentarios] = useState([]);
  const [usuarioSelecionado, setUsuarioSelecionado] = useState(null);
  const [postSelecionado, setPostSelecionado] = useState(null);
  const [exibicaoGrade, setExibicaoGrade] = useState(true);

  useEffect(() => {
    const buscarUsuarios = async () => {
      try {
        const resposta = await fetch(
          "https://jsonplaceholder.typicode.com/users"
        );
        const dados = await resposta.json();
        setUsuarios(dados);
      } catch (erro) {
        console.error("Erro ao buscar usuários:", erro);
      }
    };
    buscarUsuarios();
  }, []);

  const buscarPostsPorUsuario = async (usuarioId) => {
    try {
      const resposta = await fetch(
        `https://jsonplaceholder.typicode.com/posts?userId=${usuarioId}`
      );
      const dados = await resposta.json();
      setPosts(dados);
    } catch (erro) {
      console.error("Erro ao buscar posts:", erro);
    }
  };

  const buscarComentariosPorPost = async (postId) => {
    try {
      const resposta = await fetch(
        `https://jsonplaceholder.typicode.com/comments?postId=${postId}`
      );
      const dados = await resposta.json();
      setComentarios(dados);
    } catch (erro) {
      console.error("Erro ao buscar comentários:", erro);
    }
  };

  const selecionarUsuario = (usuario) => {
    setUsuarioSelecionado(usuario);
    buscarPostsPorUsuario(usuario.id);
  };

  const selecionarPost = (post) => {
    setPostSelecionado(post);
    buscarComentariosPorPost(post.id);
  };

  const formatarEmail = (email) => {
    const nomeUsuario = email.split("@")[0];
    return `@${nomeUsuario}`;
  };

  const limitarTexto = (texto) => {
    return texto.length > 140 ? texto.substring(0, 140) + "..." : texto;
  };

  const excluirComentario = (comentarioId) => {
    if (window.confirm("Tem certeza que deseja excluir este comentário?")) {
      setComentarios(
        comentarios.filter((comentario) => comentario.id !== comentarioId)
      );
    }
  };

  const alternarExibicao = () => {
    setExibicaoGrade(!exibicaoGrade);
  };

  const voltar = () => {
    if (postSelecionado) {
      setPostSelecionado(null);
    } else if (usuarioSelecionado) {
      setUsuarioSelecionado(null);
    }
  };

  return (
    <div>
      {/* Barra de navegação */}
      <nav className="barra-navegacao">
        <button
          onClick={voltar}
          disabled={!usuarioSelecionado && !postSelecionado}
        >
          Voltar
        </button>
        <button onClick={alternarExibicao}>
          Alternar para {exibicaoGrade ? "Lista" : "Grade"}
        </button>
      </nav>

      {!usuarioSelecionado && (
        <div className={exibicaoGrade ? "usuarios-grade" : "usuarios-lista"}>
          {usuarios.map((usuario) => (
            <div
              key={usuario.id}
              className="cartao-usuario"
              onClick={() => selecionarUsuario(usuario)}
            >
              <h2>{usuario.name}</h2>
              <p>{usuario.company.catchPhrase}</p>
            </div>
          ))}
        </div>
      )}

      {usuarioSelecionado && !postSelecionado && (
        <div>
          <h2>Posts de {usuarioSelecionado.name}</h2>
          <ul>
            {posts.map((post) => (
              <li
                key={post.id}
                className="cartao-post"
                onClick={() => selecionarPost(post)}
              >
                <h3>{post.title}</h3>
                <p>{post.body}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {postSelecionado && (
        <div>
          <h2>Comentários do post: {postSelecionado.title}</h2>
          <ul>
            {comentarios.map((comentario) => (
              <li key={comentario.id} className="cartao-comentario">
                <div className="cabecalho-comentario">
                  <strong>
                    {comentario.name.split(" ").slice(0, 1).join(" ")}{" "}
                    {comentario.name.split(" ").slice(-1).join(" ")}
                  </strong>
                  <span>{formatarEmail(comentario.email)}</span>
                  <button
                    onClick={() => excluirComentario(comentario.id)}
                    className="botao-excluir"
                  >
                    Excluir
                  </button>
                </div>
                <p>{limitarTexto(comentario.body)}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BuscarDados;
