"use client";

import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      console.log("Login attempt:", { email, password });
      // TODO: Implementar chamada ao backend
      // const response = await fetch('/api/auth/login', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email, password }),
      // })
    } catch (err) {
      setError("Erro ao fazer login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 flex items-center justify-center px-4">
      <div className="absolute top-0 right-0 p-6 lg:p-10">
        <div className="w-32 lg:w-40 drop-shadow-lg hover:drop-shadow-xl transition-all duration-300">
                                                                                                                                               ame="w-full h-auto"
            style={{
              filter: "drop-shadow(0 4px 6px rgb(0 0 0              fi       }}
          />
        </div>
      </div>

      <div className="w-full max-w-md pt-24">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="h-1.5 bg-gradient-to-r from-blue-900 via-purple-600 to-pink-500"></div>

          <div className="p-8 lg:p-10">
            <div className="mb-8">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-900 to-purple-600 bg-clip-text text-transparent mb-2">
                Badges
              </h1>
              <p className="text-gray-600 text-sm">
                Sistema de Certificaç                Sistema de Certificaç                Sis                  Sistema de Certificaç                Sistema de Certificaç                Sis      v                 Sistema de Certificaç                Sistema de Certificaç                Sis                  Sistema de Certificaç                Sistema de                  Si                   Sistema de Certificaç                Sistema de Certificaç  oc           ont-semibold text-gray-700 mb-2"
                >
                  Email
                                                                                                                                                                                 required
                    value={e                    value={e     e=                    value={e                    value={e     e=                    value={e            order-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    placeholder="seu@email.com"
                  />
                  <svg
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div>
                <label
                                                                                                                                                                                                                                                                                                               type="password"
                    required
                      lue={password}
                                                                                      className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
                    placeholder="Sua senha"
                  />
                  <svg
                    className="absolute right-3 top-2.5 w-5 h-5 text-gray-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                                          "
                                          "
t-3 top-2.5 w-5 h-5 text-gray-400"
       className="w-full px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-200"
      </div>
              </div>

              <d              <d           nt              <d              <d              id="remember"
                  type="checkbox"
                  className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                />
                <label
                  htmlFor="remember"
                  className="ml-                  className="ml-         >
                    mb                                           mb                                           mb        subm                    mb        is                    mb                full                    mb                e-                  ho                    mb :to                    mb                    ed                    mb                   opa                    mb         owed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className=               ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx                        cx         2"                        cx                        cx         2"          lo                        cx                        cx         2"                        cx                        cx         2"          lo                        cx                        cx         2"                        cx                        cx         2"          lo                        cx                        cx         2"                        cx                        cx         2"          lo                                  n>
                        cx                             cx                             cx                                     <                        cx                             cx               >
                                                                                         hover                                       on-                                              queceu                                             </p>
              <p className="mt-3">
                Ainda não tem conta?{" "}
                
                  href="#"
                  className="text-purple-600 hover:text-purple-700 font-semibold transition-colors"
                >
                  Registar-se
                </a>
              </p>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-xs mt-6">
          © 2026 CESAE Digital. Todos os direitos reservados.
        </p>
      </div>
    </div>
  );
}
