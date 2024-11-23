// ==UserScript==
// @name        ChatGPT use 4o-mini model instead of 4o
// @namespace   Monkey Scripts
// @match        *://chatgpt.com/*
// @grant       none
// @version     1.0.0
// @author      Alberto Sanchez
// @description  Intercepts completion requests and injects {model: gpt-4o-mini}
// ==/UserScript==


(function()
{
  'use strict';

  // stores the original fetch function
  const originalFetch = window.fetch;

  // overrides the fetch function
  window.fetch = async (resource, config = {}) =>
  {
    // checks if the config has a JSON body in a POST request
    if ( resource === 'https://chatgpt.com/backend-api/conversation' &&
         config.method === 'POST' &&
         config.headers &&
         config.headers['Content-Type'] === 'application/json' &&
         config.body )
    {
      try
      {
        // parses the JSON body  
        const body = JSON.parse(config.body);

        // modifies the model field only if it's different or not set everytime
        if ( !body.model || body.model !== 'gpt-4o-mini')
        {
             body.model = 'gpt-4o-mini';
             config.body = JSON.stringify(body);
        }
      }

      catch (e)
      {
        console.error('Error modifying fetch request:', e);
      }
    }

    // calls the original fetch with modified config
    return originalFetch(resource, config);
  };
})
();
