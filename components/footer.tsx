import Container from './container';
import { GITHUB_REPO_URL } from '../lib/constants';

const Footer = () => {
  return (
    <footer className="bg-neutral-50 border-t border-neutral-200">
      <Container>
        <div className="py-14 flex flex-col lg:flex-row items-center">
          <h3 className="text-4xl lg:text-[2.5rem] font-bold tracking-tighter leading-tight text-center lg:text-left mb-10 lg:mb-0 lg:pr-4 lg:w-1/2">
            Generated with Next.js.
          </h3>
          <div className="flex flex-col lg:flex-row justify-end items-center lg:pl-4 lg:w-1/2">
            {/* <a
              href="https://nextjs.org/docs/basic-features/pages"
              className="mx-3 bg-black hover:bg-white hover:text-black border border-black text-white font-bold py-3 px-12 lg:px-8 duration-200 transition-colors mb-6 lg:mb-0"
            >
              Read Documentation
            </a> */}
            <a
              href={GITHUB_REPO_URL}
              className="mx-3 font-bold hover:underline"
              target="_blank"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
