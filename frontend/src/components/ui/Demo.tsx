import React from "react";
import { PlayCircleIcon } from "../../icons/PlayCircleIcon";

const Demo: React.FC = () => {
  return (
    <section id="demo" className="py-20 lg:py-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
            Veja a mágica acontecer
          </h2>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Assista a uma demonstração rápida de como a Klyro transforma dados
            brutos em decisões financeiras inteligentes em segundos.
          </p>
        </div>
        <div className="mt-16 max-w-5xl mx-auto">
          <div className="relative group aspect-video bg-slate-200 dark:bg-slate-800 rounded-xl shadow-2xl shadow-slate-400/30 dark:shadow-slate-900/70 border border-slate-200/80 dark:border-slate-700/50 overflow-hidden cursor-pointer">
            <img
              src="https://picsum.photos/1280/720?random=2"
              alt="Demonstração da plataforma Klyro"
              className="w-full h-full object-cover opacity-60 dark:opacity-50 group-hover:opacity-80 dark:group-hover:opacity-70 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/50 dark:from-slate-900/50 to-transparent"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="p-4 bg-black/10 dark:bg-white/10 backdrop-blur-sm rounded-full transform group-hover:scale-110 transition-transform duration-300">
                <PlayCircleIcon className="w-16 h-16 md:w-20 md:h-20 text-slate-900 dark:text-white" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;
