# BERT-Category-Sentiment-Classifier

**Comment Classification and Sentiment Rating Using Fine-Tuned BERT Models**

- Developed a two-stage NLP pipeline utilizing BERT models to classify and rate user comments in a domain-specific application related to charity.
- **Model 1 (Category Classification)**: Fine-tuned a BERT model on a custom dataset of 30,000 labeled comments (Amazon reviews and domain-specific charity reviews). The model classifies comments into general (0) or charity-related (1) categories, achieving accurate classification using domain-specific labeled data.
- **Model 2 (Rating Generation)**: Fine-tuned a second BERT model on a dataset of 15,000 charity-related comments. The model predicts a sentiment rating on a scale of 1-5, where 1-2 indicate negative sentiment, 3 is neutral, and 4-5 are positive sentiments.
- Implemented robust pre-processing and data augmentation techniques, ensuring balanced class distribution and fine-tuning on small datasets for domain adaptation.
- Achieved high accuracy in both classification tasks by leveraging BERT’s transfer learning capabilities and domain-specific finetuning.
- This project demonstrates proficiency in NLP, transfer learning, and deploying domain-specific models for sentiment analysis.
