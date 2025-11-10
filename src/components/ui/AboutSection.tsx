import { useState } from 'react';
import aboutData from '../../data/aboutData.json';
import type { ActiveContent, SidebarFeatures, UserSettingsFeatures } from '../../types/aboutTypes';

const bookClubAboutData: ActiveContent[] = aboutData;

const AboutSection = () => {

  const [activeLangId, setActiveLangId] = useState<string>('CAT');

  const activeContent = bookClubAboutData.find(lang => lang.id === activeLangId)!;

  const sections = activeContent.features.sections;
  const sidebarFeatures = sections.sidebarFeatures;
  const userSettingsFeatures = sections.userSettingsFeatures;

  return (
      <section className="max-w-4xl mx-auto p-8 bg-main-bg mt-6 space-y-6 h-full scrollbar overflow-y-auto pr-4">
        <nav className="flex mb-9">
          {bookClubAboutData.map(lang => (
            <button
              key={lang.id}
              onClick={() => setActiveLangId(lang.id)}
              className={`py-3 px-5 text-center font-semibold transition-all duration-300 ease-in-out focus:outline-none
                ${activeLangId === lang.id
                  ? 'text-main-color border-b-3 border-main-color' 
                  : 'text-gray-400 hover:text-white'
                }
              `}
            >
              {lang.lang}
            </button>
          ))}
        </nav>
        <div className="mt-6 space-y-6">
          <section>
            <h2 className="text-2xl font-bold text-main-color mb-2">
              {activeContent.what.title}
            </h2>
            <p className="text-white leading-relaxed">
              {activeContent.what.text}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-main-color mb-2">
              {activeContent.actions.title}
            </h2>
            <p className="text-white leading-relaxed">
              {activeContent.actions.text}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-bold text-main-color mb-4">
              {activeContent.features.title}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-main-color mb-2">
                  {sections.sidebar}
                </h3>
                <p className="text-white leading-relaxed">
                  {sections.sidebarText}
                </p>
                <div className="mt-4 pl-4 space-y-3">
                  {(Object.keys(sidebarFeatures) as (keyof SidebarFeatures)[])
                    .filter(key => !key.endsWith('Text'))
                    .map(baseKey => (
                      <div key={baseKey}>
                        <h4 className="text-lg font-semibold text-main-color">
                          {sidebarFeatures[baseKey]}
                        </h4>
                        <p className="text-white leading-relaxed">
                          {sidebarFeatures[`${baseKey}Text` as keyof SidebarFeatures]}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-main-color mb-2">
                  {sections.chat}
                </h3>
                <p className="text-white leading-relaxed">
                  {sections.chatText}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-main-color mb-2">
                  {sections.userSettings}
                </h3>
                <div className="mt-4 pl-4 space-y-3">
                  {(Object.keys(userSettingsFeatures) as (keyof UserSettingsFeatures)[])
                    .filter(key => !key.endsWith('Text'))
                    .map(baseKey => (
                      <div key={baseKey}>
                        <h4 className="text-lg font-semibold text-main-color">
                          {userSettingsFeatures[baseKey]}
                        </h4>
                        <p className="text-white leading-relaxed">
                          {userSettingsFeatures[`${baseKey}Text` as keyof UserSettingsFeatures]}
                        </p>
                      </div>
                    ))
                  }
                </div>
              </div>

            </div>
          </section>
          <footer className="text-center text-white italic my-8 pt-6 border-t-2 border-main-color">
            <p>{activeContent.contact}</p>
          </footer>
        </div>
      </section>
  );
};

export default AboutSection;