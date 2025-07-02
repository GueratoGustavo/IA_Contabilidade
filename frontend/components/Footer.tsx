
import React from 'react';
import { TwitterIcon } from '../icons/TwitterIcon';
import { LinkedInIcon } from '../icons/LinkedInIcon';


const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Klyro<span className="text-klyro-primary">.</span></h3>
            <p className="text-sm">A Klyro é uma plataforma inteligente que utiliza IA para automatizar e otimizar a gestão financeira e contábil da sua empresa.</p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="hover:text-white"><TwitterIcon className="w-6 h-6" /></a>
              <a href="#" className="hover:text-white"><LinkedInIcon className="w-6 h-6" /></a>
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Links Rápidos</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#features" className="hover:text-white">Funcionalidades</a></li>
              <li><a href="#pricing" className="hover:text-white">Planos</a></li>
              <li><a href="#contact" className="hover:text-white">Fale com um especialista</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" className="hover:text-white">Política de Privacidade</a></li>
              <li><a href="#" className="hover:text-white">Termos de Serviço</a></li>
              <li><a href="#" className="hover:text-white">Suporte</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-800 pt-8 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Klyro. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
