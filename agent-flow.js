(function (root) {
  'use strict';

  var stages = [
    {
      name: 'ModRecx', label: 'Find your model mix', view: 'models', icon: 'model',
      steps: [
        ['Model Select', 'Match your brief, work types and volume to suitable catalogue models.'],
        ['Model Combine', 'Compare a single model with combinations for routine work and harder cases.'],
        ['Model Recommend', 'Rank the options using your quality, cost and balance preferences.']
      ],
      output: 'A recommended model mix with reasons.', action: 'Explore ModRecx'
    },
    {
      name: 'WorPrex', label: 'Shape your workflow', view: 'workflow', icon: 'workflow',
      steps: [
        ['Workflow Models', 'Compare model choices against the work each step needs to do.'],
        ['Workflow Pipelines', 'Generate a proposed sequence with inputs, outputs and human review points.'],
        ['Workflow Predictor', 'Preview the proposed flow and refine its model mix before implementation.']
      ],
      output: 'A proposed pipeline, linked to your brief and prompts.', action: 'Open WorPrex'
    },
    {
      name: 'Results', label: 'Understand the value', view: 'history', icon: 'results',
      steps: [
        ['Best-fit models', 'Review the recommended model intelligence and why it fits your task.'],
        ['Proposed workflows', 'Reopen your model choices and proposed pipeline in WorPrex.'],
        ['Estimated ROI', 'Compare illustrative costs, savings and return using your workload assumptions.']
      ],
      output: 'Recommendations and workflow context you can revisit.', action: 'View results'
    }
  ];
  var icons = {
    model: '<circle cx="12" cy="8" r="4"/><path d="M4 21v-2a8 8 0 0 1 16 0v2M8 17l4 3 4-3"/>',
    workflow: '<rect x="3" y="3" width="6" height="6" rx="1.5"/><rect x="15" y="15" width="6" height="6" rx="1.5"/><path d="M9 6h9v9M6 9v9h9"/>',
    results: '<path d="M4 20h16M7 16v-5M12 16V5M17 16V8"/>',
    lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3M12 14v3"/>'
  };

  function node(tag, text, className, parent) {
    var element = document.createElement(tag);
    if (text) element.textContent = text;
    if (className) element.className = className;
    if (parent) parent.appendChild(element);
    return element;
  }
  function icon(name, parent) {
    var span = node('span', '', 'ax-af-icon', parent);
    span.setAttribute('aria-hidden', 'true');
    var original = name === 'model' && document.querySelector('svg.mxicon');
    if (original) { span.appendChild(original.cloneNode(true)); return; }
    span.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">' + icons[name] + '</svg>';
  }
  function destination(view, text, parent, isApp, className) {
    var link = node('a', text, className || 'ax-af-link', parent);
    link.href = (isApp ? 'app.html' : 'https://allxaiapp.com/app.html') + '?go=' + view;
    if (isApp) {
      link.addEventListener('click', function (event) {
        var target = document.querySelector('#nav a[data-view="' + view + '"]');
        // Use the existing router to retain unsaved conversation/workflow state.
        if (target) { event.preventDefault(); target.click(); }
      });
    }
    return link;
  }

  function render(host, compact, isApp) {
    if (!host || host.dataset.axFlowMounted) return;
    host.dataset.axFlowMounted = 'true';
    host.classList.add('ax-agent-flow');
    host.setAttribute('aria-label', 'ALL×AI agent flow and architecture');
    var content = host;
    if (compact) {
      var disclosure = node('details', '', 'ax-af-disclosure', host);
      var summary = node('summary', '', 'ax-af-summary', disclosure);
      var heading = node('span', '', 'ax-af-summary-heading', summary);
      icon('workflow', heading);
      node('strong', 'ALL×AI agent flow', '', heading);
      node('span', 'ModRecx → WorPrex → Results', 'ax-af-summary-path', summary);
      node('span', 'Explore architecture', 'ax-af-summary-action', summary);
      content = node('div', '', 'ax-af-content', disclosure);
    } else {
      var header = node('header', '', 'ax-af-heading', content);
      node('span', 'THE ALL×AI AGENT FLOW', 'ax-af-eyebrow', header);
      node('h2', 'From your problem to a clearer plan.', '', header);
      node('p', 'Find the model mix. Shape the workflow. Review the value.', '', header);
    }

    var grid = node('div', '', 'ax-af-grid', content);
    stages.forEach(function (stage, index) {
      var card = node('article', '', 'ax-af-card', grid);
      var title = node('div', '', 'ax-af-card-heading', card);
      icon(stage.icon, title);
      var names = node('div', '', '', title);
      node('span', '0' + (index + 1) + ' · ' + stage.label, 'ax-af-step-label', names);
      node('h3', stage.name, '', names);
      var list = node('ol', '', 'ax-af-steps', card);
      stage.steps.forEach(function (step) {
        var item = node('li', '', '', list);
        var details = node('details', '', 'ax-af-step', item);
        node('summary', step[0], '', details);
        node('p', step[1], '', details);
      });
      node('p', stage.output, 'ax-af-output', card);
      destination(stage.view, stage.action + ' ↗', card, isApp);
      if (index < stages.length - 1) {
        var arrow = node('span', '→', 'ax-af-connector', card);
        arrow.setAttribute('aria-hidden', 'true');
      }
    });

    var loop = node('div', '', 'ax-af-feedback', content);
    node('span', 'COMPARE & REFINE', 'ax-af-eyebrow', loop);
    node('span', 'Model choices ↔ Workflow models', '', loop);
    node('span', 'Recommendations ↔ Pipeline predictions', '', loop);
    var value = node('div', '', 'ax-af-value', content);
    node('span', 'REVIEW YOUR RESULTS', 'ax-af-eyebrow', value);
    destination('dashboard', 'Dashboard ↗', value, isApp);
    destination('analytics', 'Analytics ↗', value, isApp);
    node('span', 'Model choices · Saved activity · Usage when measured', 'ax-af-value-note', value);

    var security = node('div', '', 'ax-af-security', content);
    icon('lock', security);
    var securityText = node('div', '', '', security);
    node('strong', 'Enterprise security', '', securityText);
    node('span', 'Across ModRecx + WorPrex. Review access, data handling and human approvals before connecting business systems.', '', securityText);
    node('p', 'Guided beta: model recommendations and pipeline predictions currently use rules. ROI is estimated. Live LLM calls and automated workflow execution are not connected.', 'ax-af-status', content);
  }

  function mount() {
    document.querySelectorAll('[data-ax-agent-flow]').forEach(function (host) { render(host, false, false); });
    var modelFlow = document.getElementById('cx-flow');
    if (modelFlow && !modelFlow.dataset.axFlowMounted) {
      modelFlow.replaceChildren();
      render(modelFlow, true, true);
      var toggle = document.getElementById('cx-flow-toggle');
      if (toggle) toggle.textContent = 'Agent flow ↗';
    }
    var workflow = document.getElementById('view-workflow');
    if (workflow && !workflow.querySelector('.ax-agent-flow')) {
      var host = document.createElement('section');
      host.className = 'ax-af-workflow';
      var heading = workflow.querySelector('.wf-heading');
      if (heading) heading.after(host); else workflow.prepend(host);
      render(host, true, true);
    }
  }
  root.AXAgentFlow = { mount: mount };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})(window);
