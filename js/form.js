/*formulaire jquery */

$(document).ready(function () {
  var $forms = $('#formInner form');

  var $bar = $('.the_bar');
  $bar.css('width', (1 / $forms.length) * 100 + '%');
  var fields = {
    firstname: '',
    lastname: '',
    phone: '',
    email: '',
    company: '',
    knowBy: '',
    budget: '',
    message: '',
    services: '',
    needs: '',
    identity: '',
  };

  $('.formAnswersGrid .answer').click(function () {
    const $this = $(this);
    if (!$this.hasClass('noContinue')) {
      setTimeout(function () {
        $this.closest('form').find('button.continue').click();
      }, 350);
    }
  });

  $forms.find('button[type=button]').click(function (e) {
    // $(".simFormhide").hide();
    e.preventDefault();
    var $target = $(e.target);
    if ($target.hasClass('continue')) {
      //Vérifier que le bouton cliqué est bien un bouton pour continuer le form
      changeForm($target);
    }
    if ($target.hasClass('previous')) {
      //Vérifier que le bouton cliqué est bien un bouton pour continuer le form
      previousForm($target);
    }
  });

  $forms.find('button[type=submit]').click(function (e) {
    e.preventDefault();
    console.log('submit');
    var $target = $(e.target);
    var ko = false;

    let firstname = document.querySelector('input[name=firstname]').value;
    let lastname = document.querySelector('input[name=lastname]').value;
    let phone = document.querySelector('input[name=phone]').value;
    let email = document.querySelector('input[name=mail]').value;
    let company = document.querySelector('input[name=company]').value;
    let knowBy = document.querySelector('input[name=knowBy]').value;
    let budget = document.querySelector('input[name=budget]').value;
    let message = document.querySelector('textarea[name=message]').value;
    let services = [
      ...document.querySelectorAll('.answer[name=services]:checked'),
    ].map((el) => el.value);
    let needs = [
      ...document.querySelectorAll('.answer[name=needs]:checked'),
    ].map((el) => el.value);
    let identity = document.querySelector(
      '.answer[name=identity]:checked'
    ).value;

    if (!firstname) return alert('Le prénom est obligatoire');
    if (!lastname) return alert('Le nom est obligatoire');
    if (!phone) return alert('Le téléphone est obligatoire');
    if (!email) return alert("L'adresse e-mail est obligatoire");
    if (!company) return alert("Le nom de l'entreprise est obligatoire");
    if (!knowBy)
      return alert('Le champ "Comment nous avez-vous connu ?" est obligatoire');
    if (!identity)
      return alert('La première question "Vous êtes ?" est obligatoire');
    if (!services.length)
      return alert(
        'La 2e question "Vous souhaitez avoir recours à une expertise externe pour :" est obligatoire'
      );
    if (!needs.length)
      return alert(
        'La 3e question : "Ainsi vous avez besoin :" est obligatoire'
      );

    if (
      !phone.match(
        /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
      )
    )
      return alert('Le téléphone est incorrect');
    if (!email.match(/\S+@\S+\.\S+/))
      return alert("L'adresse e-mail saisie est incorrecte");

    fields.firstname = firstname;
    fields.lastname = lastname;
    fields.phone = phone;
    fields.email = email;
    fields.company = company;
    fields.knowBy = knowBy;
    fields.budget = budget;
    fields.message = message;
    fields.services = services;
    fields.needs = needs;
    fields.identity = identity;

    changeForm($target);

    formatAndSendForm(fields);
  });

  function formatAndSendForm(fields) {
    console.log(fields);

    const identity = {
      bigCompany: 'Grande entreprise ou grand groupe',
      mediumCompany: 'Entreprise de taille intermédiaire',
      pme: 'Petite ou moyenne entreprise',
      startuper: 'Entrepreneur ou startuper',
      commerce: 'Restaurateur, hôtelier, commerçant',
      association: 'Association',
      publicOrganism: 'Organisme public',
    };
    const services = {
      newProduct: 'Lancer une entreprise, un nouveau produit ou un service',
      marketResearch: 'Etude de marché',
      businessPlan: 'Business plan',
      competitorAnalysis: 'Analyse concurrentielle',
      clientSatisfaction: 'Evaluation de la satisfaction client',
      stakeholderSatisfaction:
        'Evaluation de la satisfaction des parties prenantes',
      collaboratorsSatisfaction:
        'Evaluation de la satisfaction des collaborateurs',
      communicationSEO:
        'Lancer une campagne de marketing et/ou communication et améliorer le référencement',
      rse: 'Mettre en place une stratégie RSE',
      other: 'Autre',
    };

    const needs = {
      market: 'Connaître et comprendre le marché',
      profitability:
        "Estimer la rentabilité du projet via un prévisionnel financier externe à l'entreprise",
      benchmark: 'Réaliser un benchmark concurrentiel',
      actionPlan: 'Réaliser un plan d’action',
      clientsReviews: 'Connaître l’avis des clients cibles',
      goToMarket: 'Réaliser une stratégie go-to-market',
      companyPurchase:
        'Comprendre un secteur dans l’optique d’effectuer un rachat d’entreprise (M&A)',
      commercePurchase:
        'Comprendre un secteur dans l’optique d’effectuer un rachat d’une agence, usine, restaurant, hôtel, ou commerce.',
      quantitativeStudy:
        'Réaliser une étude quantitative (sondage à grande échelle)',
      qualitativeStudy: 'Réaliser une étude qualitative',
      businessPlan: 'Réaliser un business plan',
      competitorStrategy: 'Connaître les concurrents et leur stratégie',
      stakeholdersFinancial:
        'Convaincre les parties prenantes de financer votre projet',
      marketingStrategy: 'Réaliser une stratégie marketing et de ventes',
      pitchDeck: 'Réaliser un pitch deck',
    };

    // format mail to send in php
    let mail = '';
    mail += 'Prénom : ' + fields.firstname + '\n\n';
    mail += 'Nom : ' + fields.lastname + '\n\n';
    mail += 'Téléphone : ' + fields.phone + '\n\n';
    mail += 'Email : ' + fields.email + '\n\n';
    mail += 'Entreprise : ' + fields.company + '\n\n';
    mail += 'Nous ont connu par : ' + fields.knowBy + '\n\n';
    mail += 'Budget : ' + fields.budget + '\n\n';
    mail += 'Message : \n\n' + fields.message + '\n\n';
    mail += "Type d'entreprise : " + identity[fields.identity] + '\n\n';
    mail += 'Services séléctionnés : \n\n';
    fields.services.forEach((service) => {
      mail += '- ' + services[service] + '\n';
    });
    mail += '\nBesoins séléctionnés : \n\n';
    fields.needs.forEach((need) => {
      mail += '- ' + needs[need] + '\n';
    });

    console.log(mail);

    $.ajax({
      type: 'POST',
      url: 'send.php',
      data: { mail: mail },
      success: function (data) {
        console.log(data);
      },
    });
  }

  function getParameterByName(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)'),
      results = regex.exec(location.search);
    if (results === null) {
      results = regex.exec(document.referrer);
    }
    return results === null
      ? ''
      : decodeURIComponent(results[1].replace(/\+/g, ' '));
  }

  function getParameterBySource() {
    if (getParameterByName('gclid')) return 'google';
    else if (getParameterByName('fbclid')) return 'facbook';
    else if (getParameterByName('utm_source') == 'taboola') return 'taboola';
    return getParameterByName('utm_source');
  }

  function previousForm($target) {
    var $curForm = $target.closest('form');
    var curIndex = $forms.index($curForm);
    var $lastForm = $target.closest('form').prev();

    if (curIndex == 0) {
      return;
    }

    if (curIndex == 3) {
      const answerServices = [
        ...document.querySelectorAll('.answer[name=services]:checked'),
      ].map((el) => el.value);

      const servicesWithNeeds = [
        'newProduct',
        'marketResearch',
        'businessPlan',
        'competitorAnalysis',
        'clientSatisfaction',
        'stakeholderSatisfaction',
        'collaboratorsSatisfaction',
      ];

      if (
        // if selected services are not in servicesWithNeeds, we skip the next form
        curIndex == 3 &&
        answerServices.every((service) => !servicesWithNeeds.includes(service))
      ) {
        const $prevForm = $($forms[curIndex - 2]);
        $curForm.hide();
        $prevForm.show();
        return;
      }
    }

    $curForm.hide();
    $lastForm.show();
  }

  function changeForm($target) {
    let isChecked = false;
    let ko = false;
    let $curForm = $target.closest('form');
    let curIndex = $forms.index($curForm);
    let answers = $curForm.find('.answer');
    answers.each((index, answer) => {
      if ((answer.tagName = 'INPUT')) {
        if (answer.type == 'radio' || answer.type == 'checkbox') {
          if (answer.checked) isChecked = true;
          return;
        }
        isChecked = true;
        if (answer.type == 'text') {
          if (answer.value.length < 2) {
            ko = true;
          }
        }
        if (answer.type == 'textarea') {
          // not required
        }
        if (answer.type == 'email') {
          if (!answer.value.match(/\S+@\S+\.\S+/)) {
            ko = true;
          }
        }
        if (answer.type == 'tel') {
          // verify phone number
          if (
            !answer.value.match(
              /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
            )
          ) {
            ko = true;
          }
        }
      }
    });

    if (!answers) {
      isChecked = true;
    }

    if (isChecked && !ko) {
      $curForm.find('.formError').hide();
      $($forms[curIndex]).hide();
      if (curIndex == 0 || curIndex == 1) {
        // Si l'on arrive au form de chargement, on attent 1.5 sec et on passe à la prochaine page
        const answerIdentity = document.querySelector(
          '.answer[name=identity]:checked'
        ).value;
        const answerServices = [
          ...document.querySelectorAll('.answer[name=services]:checked'),
        ].map((el) => el.value);

        const possibleAnswers = document.querySelectorAll(
          `.answer[name=${curIndex == 0 ? 'services' : 'needs'}]`
        );
        possibleAnswers.forEach((el) => {
          const dataIdentity = el.dataset.identity?.split(',');
          const dataServices = el.dataset.services?.split(',');
          if (
            (dataIdentity[0] === '*' ||
              dataIdentity.includes(answerIdentity)) &&
            (!dataServices ||
              dataServices.length === 0 ||
              dataServices[0] === '*' ||
              dataServices.some((service) => answerServices.includes(service)))
          ) {
            // on Récupère le parent de l'élément et on le montre
            el.closest('.formAnswerSquare').classList.remove('hidden');
          } else {
            el.closest('.formAnswerSquare').classList.add('hidden');
          }
        });

        const servicesWithNeeds = [
          'newProduct',
          'marketResearch',
          'businessPlan',
          'competitorAnalysis',
          'clientSatisfaction',
          'stakeholderSatisfaction',
          'collaboratorsSatisfaction',
        ];

        if (
          // if selected services are not in servicesWithNeeds, we skip the next form
          curIndex == 1 &&
          answerServices.every(
            (service) => !servicesWithNeeds.includes(service)
          )
        ) {
          const $nextForm = $($forms[curIndex + 2]);
          $nextForm.show();
          return;
        }

        $($forms[curIndex + 1]).show();
      } else {
        $($forms[curIndex + 1]).show();
      }
      $bar.css('width', ((curIndex + 2) / $forms.length) * 100 + '%');
    } else {
      // Show error .formError
      $curForm.find('.formError').show();
    }
  }
});

