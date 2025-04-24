# Shifa Water App

Shifa Water App is an Android application for managing water delivery services. It allows customers to order water containers, delivery boys to manage deliveries, and administrators to oversee the entire operation.

## Features

### Customer Features
- User registration and authentication
- Browse available water products
- Place orders with quantity selection
- Track delivery status
- View order history

### Delivery Boy Features
- View assigned deliveries
- Update delivery status
- Track delivery progress
- View customer details

### Admin Features
- Manage users (customers, delivery boys)
- View all deliveries
- Track delivery status
- Manage products
- Generate reports

## Technical Stack

- **Language**: Kotlin
- **Architecture**: MVVM with Clean Architecture
- **UI Framework**: Jetpack Compose
- **Dependency Injection**: Hilt
- **Database**: Firebase Firestore
- **Authentication**: Firebase Auth
- **Storage**: Firebase Storage
- **Asynchronous Programming**: Kotlin Coroutines
- **Navigation**: Jetpack Navigation Compose

## Setup Instructions

1. Clone the repository
2. Open the project in Android Studio
3. Create a Firebase project and download `google-services.json`
4. Place `google-services.json` in the `app` directory
5. Sync project with Gradle files
6. Run the app

## Project Structure

```
app/
├── src/
│   ├── main/
│   │   ├── java/com/shifa/water/
│   │   │   ├── di/           # Dependency injection modules
│   │   │   ├── model/        # Data models
│   │   │   ├── repository/   # Data repositories
│   │   │   ├── ui/          # UI components
│   │   │   │   ├── screens/ # Screen composables
│   │   │   │   ├── theme/   # Theme components
│   │   │   │   └── navigation/ # Navigation components
│   │   │   ├── viewmodel/   # ViewModels
│   │   │   └── ShifaWaterApplication.kt
│   │   └── res/             # Resources
│   └── test/                # Unit tests
├── build.gradle
└── proguard-rules.pro
```

## Dependencies

- AndroidX Core KTX
- Jetpack Compose
- Firebase (Auth, Firestore, Storage)
- Hilt
- Kotlin Coroutines
- Navigation Compose
- Material3

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Cloudinary Integration

The app uses Cloudinary for storing and managing media files. Here's how it's integrated:

### Setup

1. Cloudinary credentials are stored in `app/src/main/java/com/shifa/water/config/CloudinaryCredentials.kt`:
   ```kotlin
   object CloudinaryCredentials {
       const val CLOUD_NAME = "dvyib7rr2"
       const val API_KEY = "535773333634764"
       const val API_SECRET = "iiLkz3T42Rj_ePHWK5aGiGA2YS8"
   }
   ```

2. Cloudinary is initialized in the `ShifaWaterApp.kt` file:
   ```kotlin
   private fun initCloudinary() {
       val config = hashMapOf(
           "cloud_name" to CloudinaryCredentials.CLOUD_NAME,
           "api_key" to CloudinaryCredentials.API_KEY,
           "api_secret" to CloudinaryCredentials.API_SECRET
       )
       
       try {
           MediaManager.init(this, config)
       } catch (e: Exception) {
           // Handle initialization error
           e.printStackTrace()
       }
   }
   ```

### Media Storage Structure

Media files are organized in the following structure:

- **Profile Pictures**: `users/profile_pictures/`
- **Delivery Boy Documents**: `users/delivery_boy_documents/{userId}/`
- **Delivery Proof Images**: `deliveries/proof_images/`
- **QR Codes**: `deliveries/qr_codes/{deliveryId}/`

### Components

1. **CloudinaryService**: Handles all media operations with Cloudinary.
2. **ImageUploadViewModel**: Manages the state of image uploads.
3. **ImageUploadComponent**: Reusable Compose component for image uploads.
4. **ProfileImageUploadScreen**: Screen for uploading profile pictures.
5. **DocumentUploadScreen**: Screen for uploading delivery boy documents.
6. **DeliveryProofUploadScreen**: Screen for uploading delivery proof images.
7. **QRCodeGenerationScreen**: Screen for generating and uploading QR codes.

### Usage

To upload an image:

```kotlin
// In a ViewModel
val imageUploadViewModel: ImageUploadViewModel = hiltViewModel()

// Upload an image
imageUploadViewModel.uploadImage(uri, "users/profile_pictures")

// Observe the upload state
val uploadState by imageUploadViewModel.uploadState.collectAsState()

// Handle the result
when (uploadState) {
    is ImageUploadViewModel.UploadState.Success -> {
        val imageUrl = (uploadState as ImageUploadViewModel.UploadState.Success).url
        // Use the image URL
    }
    is ImageUploadViewModel.UploadState.Error -> {
        val errorMessage = (uploadState as ImageUploadViewModel.UploadState.Error).message
        // Handle the error
    }
    // ...
}
```

To use the `ImageUploadComponent`:

```kotlin
ImageUploadComponent(
    viewModel = imageUploadViewModel,
    folder = "users/profile_pictures",
    onImageUploaded = { url ->
        // Handle the uploaded image URL
    },
    existingImageUrl = user.profilePictureUrl
)
```

# ShifaWater Firebase Data Import/Export Tool

This tool allows you to import and export data between JSON files and Firebase Firestore, with special handling for Firestore data types like Timestamp and GeoPoint.

## Setup

1. Make sure you have Node.js installed (v12 or higher recommended)
2. Clone this repository or download the files
3. Install dependencies:
   ```
   npm install
   ```
4. Set up your Firebase service account key:
   - Go to your Firebase project console
   - Navigate to Project Settings > Service Accounts
   - Click "Generate new private key"
   - Save the JSON file as `serviceAccountKey.json` in the root directory of this project
   - **IMPORTANT**: Never commit this file to version control!

## Usage

### Command Line Interface

#### Importing Data

To import data from a JSON file to Firestore:

```bash
npm run import -- [filePath]
```

or

```bash
node importData.js import [filePath]
```

Example:
```bash
node importData.js import ./sample-data.json
```

If no file path is provided, it defaults to `./data.json`.

#### Exporting Data

To export data from Firestore to a JSON file:

```bash
npm run export -- [outputPath] collection1 [collection2 ...]
```

or

```bash
node importData.js export [outputPath] collection1 [collection2 ...]
```

Example:
```bash
node importData.js export ./backup.json users products orders
```

If no output path is provided, it defaults to `./exported-data.json`.

### Programmatic Usage

You can also use the import/export functionality programmatically in your own scripts:

```javascript
const { importData, exportData } = require('./importDataModule');

// Import data
await importData('./sample-data.json');

// Export data
await exportData('./exported-data.json', ['users', 'products']);
```

See `demo.js` for a complete example.

## Special Data Types

The tool handles the following Firestore special data types:

### Timestamp

In your JSON file, represent timestamps as:

```json
{
  "__datatype__": "timestamp",
  "value": {
    "_seconds": 1625097600,
    "_nanoseconds": 0
  }
}
```

### GeoPoint

In your JSON file, represent geopoints as:

```json
{
  "__datatype__": "geopoint",
  "value": {
    "_latitude": 19.0760,
    "_longitude": 72.8777
  }
}
```

## Sample Data

A sample data file (`sample-data.json`) is included to demonstrate the format, including examples of special data types.

## Firebase Rules

The repository also includes:

- `firestore.rules` - Security rules for Firestore
- `database.rules.json` - Security rules for Realtime Database

To deploy these rules to your Firebase project:

```bash
npm install -g firebase-tools
firebase login
firebase use your-project-id
npm run deploy:rules
```

## Files in this Repository

- `importData.js` - Command line tool for importing/exporting data
- `importDataModule.js` - Module version for programmatic usage
- `demo.js` - Example of programmatic usage
- `sample-data.json` - Sample data file with special types
- `firestore.rules` - Firestore security rules
- `database.rules.json` - Realtime Database security rules
- `serviceAccountKey.example.json` - Example service account key format
- `package.json` - Project configuration and dependencies

## Troubleshooting

- **Error: Cannot find module './serviceAccountKey.json'**: Make sure you've downloaded your service account key and saved it as `serviceAccountKey.json` in the root directory.
- **Permission denied errors**: Check that your service account has the necessary permissions in your Firebase project.
- **Timeout errors**: For large datasets, you may need to increase the timeout in your code or split the import/export into smaller batches.

# ShifaWater Common Library

यह लाइब्रेरी ShifaWater एडमिन ऐप और ShifaWater कस्टमर ऐप के बीच कोड शेयरिंग के लिए बनाई गई है। इसमें दोनों ऐप्स में इस्तेमाल होने वाली मॉडल क्लासेस, यूटिलिटीज और UI कॉम्पोनेंट्स शामिल हैं।

## शेयर्ड लाइब्रेरी के फीचर्स

- मॉडल क्लासेस (BaseModel, User, UserRole, आदि)
- फायरस्टोर इंटीग्रेशन यूटिलिटीज
- कॉमन UI कॉम्पोनेंट्स
- थीम और स्टाइल की शेयरिंग

## शेयर्ड लाइब्रेरी का उपयोग कैसे करें

### शेयर्ड लाइब्रेरी को बिल्ड करें

```bash
./gradlew :library:assembleRelease
```

### एडमिन ऐप (ShifaWater) में शेयर्ड लाइब्रेरी का उपयोग

1. ShifaWater/settings.gradle.kts में निम्न लाइन जोड़ें:

```kotlin
includeBuild("../ShifaWaterCommon") {
    dependencySubstitution {
        substitute(module("com.shifa.water:common")).using(project(":library"))
    }
}
```

2. ShifaWater/app/build.gradle.kts में शेयर्ड लाइब्रेरी को डिपेंडेंसी के रूप में जोड़ें:

```kotlin
dependencies {
    implementation("com.shifa.water:common:1.0.0")
    // अन्य डिपेंडेंसीज...
}
```

3. इम्पोर्ट का उपयोग करें:

```kotlin
import com.shifa.water.common.model.User
import com.shifa.water.common.model.UserRole
// अन्य इम्पोर्ट...
```

### कस्टमर ऐप (ShifaWaterCustomer) में शेयर्ड लाइब्रेरी का उपयोग

1. ShifaWaterCustomer/settings.gradle.kts में निम्न लाइन जोड़ें:

```kotlin
includeBuild("../ShifaWaterCommon") {
    dependencySubstitution {
        substitute(module("com.shifa.water:common")).using(project(":library"))
    }
}
```

2. ShifaWaterCustomer/app/build.gradle.kts में शेयर्ड लाइब्रेरी को डिपेंडेंसी के रूप में जोड़ें:

```kotlin
dependencies {
    implementation("com.shifa.water:common:1.0.0")
    // अन्य डिपेंडेंसीज...
}
```

3. इम्पोर्ट का उपयोग करें:

```kotlin
import com.shifa.water.common.model.User
import com.shifa.water.common.model.UserRole
// अन्य इम्पोर्ट...
```

## लाइब्रेरी को अपडेट करना

जब भी शेयर्ड लाइब्रेरी में कोई बदलाव होता है, उसे फिर से बिल्ड करना होगा और दोनों ऐप्स को रीबिल्ड करना होगा।

```bash
cd ShifaWaterCommon
./gradlew :library:clean :library:assembleRelease
```

फिर दोनों ऐप्स को रीबिल्ड करें:

```bash
cd ../ShifaWater
./gradlew clean build

cd ../ShifaWaterCustomer
./gradlew clean build
```

# शिफा वाटर - लैंडिंग पेज

यह शिफा वाटर ऐप के लिए एक प्रोफेशनल लैंडिंग पेज है।

## विशेषताएं

- आधुनिक और रिस्पॉन्सिव डिज़ाइन
- स्मूथ एनिमेशन्स
- डायरेक्ट ऐप डाउनलोड
- कॉन्टैक्ट फॉर्म
- सोशल मीडिया इंटीग्रेशन

## फाइल स्ट्रक्चर

```
.
├── index.html          # मुख्य HTML फाइल
├── styles.css          # CSS स्टाइल्स
├── script.js           # JavaScript फंक्शनैलिटी
├── app-release.apk     # ऐप की APK फाइल
└── README.md           # प्रोजेक्ट डॉक्युमेंटेशन
```

## सेटअप

1. GitHub पर रिपॉजिटरी बनाएं
2. सभी फाइल्स अपलोड करें
3. GitHub Pages सेटिंग्स में जाएं
4. Source को "main" ब्रांच पर सेट करें

## कस्टमाइजेशन

- कलर्स: `styles.css` में `:root` सेक्शन में बदलाव करें
- कंटेंट: `index.html` में बदलाव करें
- इमेजेज: अपनी इमेजेज अपलोड करें

## सपोर्ट

किसी भी प्रश्न या सहायता के लिए संपर्क करें:
- ईमेल: support@shifawater.com
- फोन: +91 XXXXXXXXXX 